'use client';

import { useState, useEffect } from 'react';
import CookieConsentBanner from 'react-cookie-consent';
import { Cookie, Settings, Shield } from 'lucide-react';
import {
    getConsentModel,
    getRegionBannerText,
    getDefaultCategories,
    CONSENT_COOKIE_NAME,
    CONSENT_CATEGORIES_COOKIE_NAME,
    stringifyConsentCategories,
    parseConsentCategories,
    type ConsentCategories,
    type ConsentModel,
} from '@/lib/cookie-utils';

interface CookieConsentProps {
    tenant: {
        id: string;
        businessName: string;
        countryCode: string;
        settings?: any;
    };
}

export function CookieConsent({ tenant }: CookieConsentProps) {
    const [showCustomize, setShowCustomize] = useState(false);
    const [categories, setCategories] = useState<ConsentCategories | null>(null);
    const [mounted, setMounted] = useState(false);

    const consentModel = getConsentModel(tenant.countryCode);
    const bannerText = getRegionBannerText(tenant.countryCode);

    // Check if cookie consent is enabled for tenant
    const settings = tenant.settings as Record<string, any> | null;
    const isEnabled = settings?.cookieConsentEnabled !== false;
    const customMessage = settings?.cookieBannerMessage;

    useEffect(() => {
        setMounted(true);
        // Initialize categories from cookie or defaults
        const existingCategories = getCookieValue(CONSENT_CATEGORIES_COOKIE_NAME);
        const parsed = parseConsentCategories(existingCategories);
        setCategories(parsed || getDefaultCategories(consentModel));
    }, [consentModel]);

    if (!mounted || !isEnabled) return null;

    const handleAccept = () => {
        // Accept all categories
        const allAccepted: ConsentCategories = {
            essential: true,
            analytics: true,
            marketing: true,
            preferences: true,
        };
        saveCategories(allAccepted);
        setCategories(allAccepted);
        setShowCustomize(false);
    };

    const handleDecline = () => {
        // Only essential cookies
        const essentialOnly: ConsentCategories = {
            essential: true,
            analytics: false,
            marketing: false,
            preferences: false,
        };
        saveCategories(essentialOnly);
        setCategories(essentialOnly);
        setShowCustomize(false);
    };

    const handleSavePreferences = () => {
        if (categories) {
            saveCategories(categories);
        }
        setShowCustomize(false);
    };

    const saveCategories = (cats: ConsentCategories) => {
        document.cookie = `${CONSENT_CATEGORIES_COOKIE_NAME}=${stringifyConsentCategories(cats)}; path=/; max-age=31536000; SameSite=Lax`;
    };

    if (showCustomize) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Settings className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookie Preferences</h3>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Customize which cookies you allow. Essential cookies are always enabled as they're required for the site to function.
                    </p>

                    <div className="space-y-4">
                        {/* Essential - Always on */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Essential</p>
                                <p className="text-xs text-gray-500">Required for site functionality</p>
                            </div>
                            <div className="text-emerald-600 text-sm font-medium">Always On</div>
                        </div>

                        {/* Analytics */}
                        <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Analytics</p>
                                <p className="text-xs text-gray-500">Help us improve our service</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={categories?.analytics ?? false}
                                onChange={(e) => setCategories(prev => prev ? { ...prev, analytics: e.target.checked } : null)}
                                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                        </label>

                        {/* Marketing */}
                        <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Marketing</p>
                                <p className="text-xs text-gray-500">Personalized ads and offers</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={categories?.marketing ?? false}
                                onChange={(e) => setCategories(prev => prev ? { ...prev, marketing: e.target.checked } : null)}
                                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                        </label>

                        {/* Preferences */}
                        <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Preferences</p>
                                <p className="text-xs text-gray-500">Remember your settings</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={categories?.preferences ?? false}
                                onChange={(e) => setCategories(prev => prev ? { ...prev, preferences: e.target.checked } : null)}
                                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                        </label>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => setShowCustomize(false)}
                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSavePreferences}
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                        >
                            Save Preferences
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CookieConsentBanner
            location="bottom"
            buttonText={bannerText.acceptLabel}
            declineButtonText={bannerText.declineLabel}
            cookieName={CONSENT_COOKIE_NAME}
            enableDeclineButton={consentModel === 'opt-in'}
            onAccept={handleAccept}
            onDecline={handleDecline}
            expires={365}
            style={{
                background: 'linear-gradient(to right, #065f46, #047857)',
                padding: '16px 24px',
                alignItems: 'center',
                fontSize: '14px',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
            }}
            buttonStyle={{
                background: 'white',
                color: '#065f46',
                fontWeight: '600',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '14px',
            }}
            declineButtonStyle={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: 'white',
                fontWeight: '500',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                marginRight: '8px',
            }}
            contentStyle={{
                flex: '1 0 300px',
            }}
        >
            <div className="flex items-start gap-3">
                <Cookie className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                <div>
                    <span className="text-white">
                        {customMessage || bannerText.message}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowCustomize(true);
                        }}
                        className="ml-2 text-emerald-200 underline hover:text-white transition-colors"
                    >
                        {bannerText.customizeLabel}
                    </button>
                </div>
            </div>
        </CookieConsentBanner>
    );
}

// Helper to get cookie value
function getCookieValue(name: string): string | undefined {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : undefined;
}

/**
 * Hook to check if a cookie category is allowed
 */
export function useCookieConsent() {
    const [categories, setCategories] = useState<ConsentCategories | null>(null);

    useEffect(() => {
        const cookieValue = getCookieValue(CONSENT_CATEGORIES_COOKIE_NAME);
        const parsed = parseConsentCategories(cookieValue);
        setCategories(parsed);
    }, []);

    return {
        isAnalyticsAllowed: categories?.analytics ?? false,
        isMarketingAllowed: categories?.marketing ?? false,
        isPreferencesAllowed: categories?.preferences ?? false,
        categories,
    };
}

export default CookieConsent;
