import { Tenant } from '@prisma/client';
import Hero from './components/Hero';
import AboutHero from './components/AboutHero';
import ValueProps from './components/ValueProps';
import Cultivation from './components/Cultivation';
import International from './components/International';
import News from './components/News';
import './styles.css';

interface TemplateProps {
  tenant: Tenant;
  consultationUrl: string;
  productsUrl: string;
  contactUrl: string;
  heroImageUrl?: string | null;
  logoUrl?: string | null;
}

export default function LovableTemplate({
  tenant,
  consultationUrl,
  productsUrl,
  contactUrl,
  heroImageUrl,
  logoUrl
}: TemplateProps) {
  const settings = tenant.settings as any;
  
  return (
    <div style={{ 
      fontFamily: 'var(--tenant-font-base)',
      backgroundColor: 'var(--tenant-color-background)',
      color: 'var(--tenant-color-text)'
    }}>
      <Hero />
      <AboutHero />
      <ValueProps />
      <Cultivation />
      <International />
      <News />
    </div>
  );
}
