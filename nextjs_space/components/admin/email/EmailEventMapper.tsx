
'use client';

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface EmailTemplate {
    id: string;
    name: string;
}

interface EmailMapping {
    id: string;
    eventType: string;
    templateId: string;
    isActive: boolean;
}

const SYSTEM_EVENTS = [
    { id: 'welcome', label: 'User Welcome Email', description: 'Sent when a new user signs up.' },
    { id: 'passwordReset', label: 'Password Reset', description: 'Sent when user requests password reset.' },
    { id: 'tenantWelcome', label: 'Tenant Welcome', description: 'Sent when a new tenant is created.' },
    { id: 'orderConfirmation', label: 'Order Confirmation', description: 'Sent after purchase.' },
];

export const EmailEventMapper = () => {
    // Fetch Templates
    const { data: templates, isLoading: loadingTemplates } = useSWR<EmailTemplate[]>('/api/super-admin/email-templates', fetcher);

    // Fetch Mappings
    const { data: mappings, isLoading: loadingMappings } = useSWR<EmailMapping[]>('/api/super-admin/email-mappings', fetcher);

    const [saving, setSaving] = useState<string | null>(null);

    const getActiveTemplateId = (eventId: string) => {
        if (!mappings || !Array.isArray(mappings)) return undefined;
        const mapping = mappings.find(m => m.eventType === eventId);
        return mapping?.templateId;
    };

    const handleSaveMapping = async (eventId: string, templateId: string) => {
        setSaving(eventId);
        try {
            const res = await fetch('/api/super-admin/email-mappings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventType: eventId,
                    templateId: templateId,
                    isActive: true
                }),
            });

            if (!res.ok) throw new Error('Failed to save mapping');

            toast.success('Event mapping updated');
            mutate('/api/super-admin/email-mappings');
        } catch (error) {
            toast.error('Failed to update mapping');
        } finally {
            setSaving(null);
        }
    };

    if (loadingTemplates || loadingMappings) return <div>Loading configuration...</div>;

    const templateList = Array.isArray(templates) ? templates : [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>System Event Mappings</CardTitle>
                <CardDescription>
                    Map system events to specific email templates. These defaults will be used unless overridden by a tenant.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Event Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-[300px]">Active Template</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {SYSTEM_EVENTS.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell className="font-medium">{event.label}</TableCell>
                                <TableCell className="text-muted-foreground">{event.description}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={getActiveTemplateId(event.id) || "default"}
                                            onValueChange={(val) => {
                                                if (val !== "default") handleSaveMapping(event.id, val);
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a template" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="default" disabled>
                                                    <em>Select a template...</em>
                                                </SelectItem>
                                                {templateList.map(t => (
                                                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {saving === event.id && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
