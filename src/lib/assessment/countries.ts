export interface CountryInfo {
  code: string;
  nameEn: string;
  nameEs: string;
  defaultCurrency?: string;
}

export const COUNTRIES: CountryInfo[] = [
  { code: "MX", nameEn: "Mexico", nameEs: "México", defaultCurrency: "MXN" },
  { code: "GT", nameEn: "Guatemala", nameEs: "Guatemala", defaultCurrency: "GTQ" },
  { code: "HN", nameEn: "Honduras", nameEs: "Honduras", defaultCurrency: "HNL" },
  { code: "SV", nameEn: "El Salvador", nameEs: "El Salvador", defaultCurrency: "USD" },
  { code: "NI", nameEn: "Nicaragua", nameEs: "Nicaragua", defaultCurrency: "NIO" },
  { code: "CR", nameEn: "Costa Rica", nameEs: "Costa Rica", defaultCurrency: "CRC" },
  { code: "PA", nameEn: "Panama", nameEs: "Panamá", defaultCurrency: "PAB" },
  { code: "CO", nameEn: "Colombia", nameEs: "Colombia", defaultCurrency: "COP" },
  { code: "VE", nameEn: "Venezuela", nameEs: "Venezuela", defaultCurrency: "VES" },
  { code: "EC", nameEn: "Ecuador", nameEs: "Ecuador", defaultCurrency: "USD" },
  { code: "PE", nameEn: "Peru", nameEs: "Perú", defaultCurrency: "PEN" },
  { code: "BO", nameEn: "Bolivia", nameEs: "Bolivia", defaultCurrency: "BOB" },
  { code: "PY", nameEn: "Paraguay", nameEs: "Paraguay", defaultCurrency: "PYG" },
  { code: "CL", nameEn: "Chile", nameEs: "Chile", defaultCurrency: "CLP" },
  { code: "AR", nameEn: "Argentina", nameEs: "Argentina", defaultCurrency: "ARS" },
  { code: "UY", nameEn: "Uruguay", nameEs: "Uruguay", defaultCurrency: "UYU" },
  { code: "BR", nameEn: "Brazil", nameEs: "Brasil", defaultCurrency: "BRL" },
  { code: "DO", nameEn: "Dominican Republic", nameEs: "República Dominicana", defaultCurrency: "DOP" },
  { code: "HT", nameEn: "Haiti", nameEs: "Haití", defaultCurrency: "HTG" },
  { code: "JM", nameEn: "Jamaica", nameEs: "Jamaica", defaultCurrency: "JMD" },
  { code: "US", nameEn: "United States", nameEs: "Estados Unidos", defaultCurrency: "USD" },
  { code: "CA", nameEn: "Canada", nameEs: "Canadá", defaultCurrency: "CAD" },
  { code: "KE", nameEn: "Kenya", nameEs: "Kenia", defaultCurrency: "KES" },
  { code: "UG", nameEn: "Uganda", nameEs: "Uganda", defaultCurrency: "UGX" },
  { code: "TZ", nameEn: "Tanzania", nameEs: "Tanzania", defaultCurrency: "TZS" },
  { code: "ET", nameEn: "Ethiopia", nameEs: "Etiopía", defaultCurrency: "ETB" },
  { code: "NG", nameEn: "Nigeria", nameEs: "Nigeria", defaultCurrency: "NGN" },
  { code: "GH", nameEn: "Ghana", nameEs: "Ghana", defaultCurrency: "GHS" },
  { code: "IN", nameEn: "India", nameEs: "India", defaultCurrency: "INR" },
  { code: "BD", nameEn: "Bangladesh", nameEs: "Bangladés", defaultCurrency: "BDT" },
  { code: "PK", nameEn: "Pakistan", nameEs: "Pakistán", defaultCurrency: "PKR" },
  { code: "NP", nameEn: "Nepal", nameEs: "Nepal", defaultCurrency: "NPR" },
  { code: "PH", nameEn: "Philippines", nameEs: "Filipinas", defaultCurrency: "PHP" },
  { code: "ID", nameEn: "Indonesia", nameEs: "Indonesia", defaultCurrency: "IDR" },
  { code: "VN", nameEn: "Vietnam", nameEs: "Vietnam", defaultCurrency: "VND" },
  { code: "ZA", nameEn: "South Africa", nameEs: "Sudáfrica", defaultCurrency: "ZAR" },
  { code: "EG", nameEn: "Egypt", nameEs: "Egipto", defaultCurrency: "EGP" },
  { code: "MA", nameEn: "Morocco", nameEs: "Marruecos", defaultCurrency: "MAD" },
  { code: "OTHER", nameEn: "Other Country", nameEs: "Otro País", defaultCurrency: "USD" },
];
