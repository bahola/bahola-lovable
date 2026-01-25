/**
 * Parses combined product description content from Swell.
 * Extracts the main description and key benefits from a single text field.
 * 
 * Expected format:
 * "Description text here... Dosage: X drops...
 * 
 * #Key Benefits
 * • Benefit 1
 * • Benefit 2
 * • Benefit 3"
 */

export interface ParsedProductContent {
  description: string;
  benefits: string[];
}

export function parseProductContent(rawDescription: string | undefined | null): ParsedProductContent {
  if (!rawDescription || typeof rawDescription !== 'string') {
    return {
      description: '',
      benefits: []
    };
  }

  // Convert HTML to plain text for parsing
  // Replace <br> tags with newlines
  let plainText = rawDescription
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&bull;/g, '•')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]*>/g, '')  // Strip all HTML tags
    .trim();

  // Split on "Key Benefits" marker (case-insensitive, with or without #)
  const keyBenefitsMarker = /#?\s*Key\s*Benefits/i;
  const parts = plainText.split(keyBenefitsMarker);
  
  // Main description is everything before Key Benefits
  const descriptionPart = parts[0]?.trim() || '';
  
  // Benefits are everything after Key Benefits
  const benefitsPart = parts[1] || '';
  
  // Extract bullet points from benefits section
  const benefits = benefitsPart
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))
    .map(line => line.replace(/^[•\-*]\s*/, '').trim())
    .filter(line => line.length > 0);

  return {
    description: descriptionPart,
    benefits
  };
}
