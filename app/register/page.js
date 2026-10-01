'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const countries = [
  { code: '+93', flag: '🇦🇫', name: 'Afghanistan', currency: 'AFN', symbol: '؋' },
  { code: '+355', flag: '🇦🇱', name: 'Albania', currency: 'ALL', symbol: 'L' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria', currency: 'DZD', symbol: 'د.ج' },
  { code: '+1 684', flag: '🇦🇸', name: 'American Samoa', currency: 'USD', symbol: '$' },
  { code: '+376', flag: '🇦🇩', name: 'Andorra', currency: 'EUR', symbol: '€' },
  { code: '+244', flag: '🇦🇴', name: 'Angola', currency: 'AOA', symbol: 'Kz' },
  { code: '+1 264', flag: '🇦🇮', name: 'Anguilla', currency: 'XCD', symbol: '$' },
  { code: '+672', flag: '🇦🇶', name: 'Antarctica', currency: 'USD', symbol: '$' },
  { code: '+1 268', flag: '🇦🇬', name: 'Antigua and Barbuda', currency: 'XCD', symbol: '$' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina', currency: 'ARS', symbol: '$' },
  { code: '+374', flag: '🇦🇲', name: 'Armenia', currency: 'AMD', symbol: '֏' },
  { code: '+297', flag: '🇦🇼', name: 'Aruba', currency: 'AWG', symbol: 'ƒ' },
  { code: '+61', flag: '🇦🇺', name: 'Australia', currency: 'AUD', symbol: 'A$' },
  { code: '+43', flag: '🇦🇹', name: 'Austria', currency: 'EUR', symbol: '€' },
  { code: '+994', flag: '🇦🇿', name: 'Azerbaijan', currency: 'AZN', symbol: '₼' },
  { code: '+1 242', flag: '🇧🇸', name: 'Bahamas', currency: 'BSD', symbol: '$' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain', currency: 'BHD', symbol: '.د.ب' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh', currency: 'BDT', symbol: '৳' },
  { code: '+1 246', flag: '🇧🇧', name: 'Barbados', currency: 'BBD', symbol: '$' },
  { code: '+375', flag: '🇧🇾', name: 'Belarus', currency: 'BYN', symbol: 'Br' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium', currency: 'EUR', symbol: '€' },
  { code: '+501', flag: '🇧🇿', name: 'Belize', currency: 'BZD', symbol: 'BZ$' },
  { code: '+229', flag: '🇧🇯', name: 'Benin', currency: 'XOF', symbol: 'CFA' },
  { code: '+1 441', flag: '🇧🇲', name: 'Bermuda', currency: 'BMD', symbol: '$' },
  { code: '+975', flag: '🇧🇹', name: 'Bhutan', currency: 'BTN', symbol: 'Nu.' },
  { code: '+591', flag: '🇧🇴', name: 'Bolivia', currency: 'BOB', symbol: 'Bs.' },
  { code: '+387', flag: '🇧🇦', name: 'Bosnia and Herzegovina', currency: 'BAM', symbol: 'KM' },
  { code: '+267', flag: '🇧🇼', name: 'Botswana', currency: 'BWP', symbol: 'P' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil', currency: 'BRL', symbol: 'R$' },
  { code: '+1 284', flag: '🇻🇬', name: 'British Virgin Islands', currency: 'USD', symbol: '$' },
  { code: '+673', flag: '🇧🇳', name: 'Brunei', currency: 'BND', symbol: '$' },
  { code: '+359', flag: '🇧🇬', name: 'Bulgaria', currency: 'BGN', symbol: 'лв' },
  { code: '+226', flag: '🇧🇫', name: 'Burkina Faso', currency: 'XOF', symbol: 'CFA' },
  { code: '+257', flag: '🇧🇮', name: 'Burundi', currency: 'BIF', symbol: 'FBu' },
  { code: '+855', flag: '🇰🇭', name: 'Cambodia', currency: 'KHR', symbol: '៛' },
  { code: '+237', flag: '🇨🇲', name: 'Cameroon', currency: 'XAF', symbol: 'FCFA' },
  { code: '+1', flag: '🇨🇦', name: 'Canada', currency: 'CAD', symbol: 'C$' },
  { code: '+238', flag: '🇨🇻', name: 'Cape Verde', currency: 'CVE', symbol: '$' },
  { code: '+1 345', flag: '🇰🇾', name: 'Cayman Islands', currency: 'KYD', symbol: '$' },
  { code: '+236', flag: '🇨🇫', name: 'Central African Republic', currency: 'XAF', symbol: 'FCFA' },
  { code: '+235', flag: '🇹🇩', name: 'Chad', currency: 'XAF', symbol: 'FCFA' },
  { code: '+56', flag: '🇨🇱', name: 'Chile', currency: 'CLP', symbol: '$' },
  { code: '+86', flag: '🇨🇳', name: 'China', currency: 'CNY', symbol: '¥' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia', currency: 'COP', symbol: '$' },
  { code: '+269', flag: '🇰🇲', name: 'Comoros', currency: 'KMF', symbol: 'CF' },
  { code: '+243', flag: '🇨🇬', name: 'Congo', currency: 'XAF', symbol: 'FCFA' },
  { code: '+243', flag: '🇨🇩', name: 'Congo DRC', currency: 'CDF', symbol: 'FC' },
  { code: '+682', flag: '🇨🇰', name: 'Cook Islands', currency: 'NZD', symbol: '$' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica', currency: 'CRC', symbol: '₡' },
  { code: '+385', flag: '🇭🇷', name: 'Croatia', currency: 'EUR', symbol: '€' },
  { code: '+53', flag: '🇨🇺', name: 'Cuba', currency: 'CUP', symbol: '₱' },
  { code: '+599', flag: '🇨🇼', name: 'Curacao', currency: 'ANG', symbol: 'ƒ' },
  { code: '+357', flag: '🇨🇾', name: 'Cyprus', currency: 'EUR', symbol: '€' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic', currency: 'CZK', symbol: 'Kč' },
  { code: '+45', flag: '🇩🇰', name: 'Denmark', currency: 'DKK', symbol: 'kr' },
  { code: '+253', flag: '🇩🇯', name: 'Djibouti', currency: 'DJF', symbol: 'Fdj' },
  { code: '+1 767', flag: '🇩🇲', name: 'Dominica', currency: 'XCD', symbol: '$' },
  { code: '+1 809', flag: '🇩🇴', name: 'Dominican Republic', currency: 'DOP', symbol: 'RD$' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador', currency: 'USD', symbol: '$' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt', currency: 'EGP', symbol: '£' },
  { code: '+503', flag: '🇸🇻', name: 'El Salvador', currency: 'USD', symbol: '$' },
  { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea', currency: 'XAF', symbol: 'FCFA' },
  { code: '+291', flag: '🇪🇷', name: 'Eritrea', currency: 'ERN', symbol: 'Nfk' },
  { code: '+372', flag: '🇪🇪', name: 'Estonia', currency: 'EUR', symbol: '€' },
  { code: '+268', flag: '🇸🇿', name: 'Eswatini', currency: 'SZL', symbol: 'E' },
  { code: '+251', flag: '🇪🇹', name: 'Ethiopia', currency: 'ETB', symbol: 'Br' },
  { code: '+500', flag: '🇫🇰', name: 'Falkland Islands', currency: 'FKP', symbol: '£' },
  { code: '+298', flag: '🇫🇴', name: 'Faroe Islands', currency: 'DKK', symbol: 'kr' },
  { code: '+679', flag: '🇫🇯', name: 'Fiji', currency: 'FJD', symbol: '$' },
  { code: '+358', flag: '🇫🇮', name: 'Finland', currency: 'EUR', symbol: '€' },
  { code: '+33', flag: '🇫🇷', name: 'France', currency: 'EUR', symbol: '€' },
  { code: '+689', flag: '🇵🇫', name: 'French Polynesia', currency: 'XPF', symbol: '₣' },
  { code: '+241', flag: '🇬🇦', name: 'Gabon', currency: 'XAF', symbol: 'FCFA' },
  { code: '+220', flag: '🇬🇲', name: 'Gambia', currency: 'GMD', symbol: 'D' },
  { code: '+995', flag: '🇬🇪', name: 'Georgia', currency: 'GEL', symbol: '₾' },
  { code: '+49', flag: '🇩🇪', name: 'Germany', currency: 'EUR', symbol: '€' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana', currency: 'GHS', symbol: '₵' },
  { code: '+350', flag: '🇬🇮', name: 'Gibraltar', currency: 'GIP', symbol: '£' },
  { code: '+30', flag: '🇬🇷', name: 'Greece', currency: 'EUR', symbol: '€' },
  { code: '+299', flag: '🇬🇱', name: 'Greenland', currency: 'DKK', symbol: 'kr' },
  { code: '+1 473', flag: '🇬🇩', name: 'Grenada', currency: 'XCD', symbol: '$' },
  { code: '+1 671', flag: '🇬🇺', name: 'Guam', currency: 'USD', symbol: '$' },
  { code: '+502', flag: '🇬🇹', name: 'Guatemala', currency: 'GTQ', symbol: 'Q' },
  { code: '+224', flag: '🇬🇳', name: 'Guinea', currency: 'GNF', symbol: 'FG' },
  { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau', currency: 'XOF', symbol: 'CFA' },
  { code: '+592', flag: '🇬🇾', name: 'Guyana', currency: 'GYD', symbol: '$' },
  { code: '+509', flag: '🇭🇹', name: 'Haiti', currency: 'HTG', symbol: 'G' },
  { code: '+504', flag: '🇭🇳', name: 'Honduras', currency: 'HNL', symbol: 'L' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong', currency: 'HKD', symbol: 'HK$' },
  { code: '+36', flag: '🇭🇺', name: 'Hungary', currency: 'HUF', symbol: 'Ft' },
  { code: '+354', flag: '🇮🇸', name: 'Iceland', currency: 'ISK', symbol: 'kr' },
  { code: '+91', flag: '🇮🇳', name: 'India', currency: 'INR', symbol: '₹' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia', currency: 'IDR', symbol: 'Rp' },
  { code: '+98', flag: '🇮🇷', name: 'Iran', currency: 'IRR', symbol: '﷼' },
  { code: '+964', flag: '🇮🇶', name: 'Iraq', currency: 'IQD', symbol: 'ع.د' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland', currency: 'EUR', symbol: '€' },
  { code: '+972', flag: '🇮🇱', name: 'Israel', currency: 'ILS', symbol: '₪' },
  { code: '+39', flag: '🇮🇹', name: 'Italy', currency: 'EUR', symbol: '€' },
  { code: '+1 876', flag: '🇯🇲', name: 'Jamaica', currency: 'JMD', symbol: 'J$' },
  { code: '+81', flag: '🇯🇵', name: 'Japan', currency: 'JPY', symbol: '¥' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan', currency: 'JOD', symbol: 'JD' },
  { code: '+7', flag: '🇰🇿', name: 'Kazakhstan', currency: 'KZT', symbol: '₸' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya', currency: 'KES', symbol: 'KSh' },
  { code: '+686', flag: '🇰🇮', name: 'Kiribati', currency: 'AUD', symbol: 'A$' },
  { code: '+850', flag: '🇰🇵', name: 'North Korea', currency: 'KPW', symbol: '₩' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea', currency: 'KRW', symbol: '₩' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait', currency: 'KWD', symbol: 'KD' },
  { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan', currency: 'KGS', symbol: 'лв' },
  { code: '+856', flag: '🇱🇦', name: 'Laos', currency: 'LAK', symbol: '₭' },
  { code: '+371', flag: '🇱🇻', name: 'Latvia', currency: 'EUR', symbol: '€' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon', currency: 'LBP', symbol: '£' },
  { code: '+266', flag: '🇱🇸', name: 'Lesotho', currency: 'LSL', symbol: 'M' },
  { code: '+231', flag: '🇱🇷', name: 'Liberia', currency: 'LRD', symbol: '$' },
  { code: '+218', flag: '🇱🇾', name: 'Libya', currency: 'LYD', symbol: 'LD' },
  { code: '+423', flag: '🇱🇮', name: 'Liechtenstein', currency: 'CHF', symbol: 'CHF' },
  { code: '+370', flag: '🇱🇹', name: 'Lithuania', currency: 'EUR', symbol: '€' },
  { code: '+352', flag: '🇱🇺', name: 'Luxembourg', currency: 'EUR', symbol: '€' },
  { code: '+853', flag: '🇲🇴', name: 'Macao', currency: 'MOP', symbol: 'MOP$' },
  { code: '+389', flag: '🇲🇰', name: 'North Macedonia', currency: 'MKD', symbol: 'ден' },
  { code: '+261', flag: '🇲🇬', name: 'Madagascar', currency: 'MGA', symbol: 'Ar' },
  { code: '+265', flag: '🇲🇼', name: 'Malawi', currency: 'MWK', symbol: 'MK' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia', currency: 'MYR', symbol: 'RM' },
  { code: '+960', flag: '🇲🇻', name: 'Maldives', currency: 'MVR', symbol: 'Rf' },
  { code: '+223', flag: '🇲🇱', name: 'Mali', currency: 'XOF', symbol: 'CFA' },
  { code: '+356', flag: '🇲🇹', name: 'Malta', currency: 'EUR', symbol: '€' },
  { code: '+692', flag: '🇲🇭', name: 'Marshall Islands', currency: 'USD', symbol: '$' },
  { code: '+222', flag: '🇲🇷', name: 'Mauritania', currency: 'MRU', symbol: 'UM' },
  { code: '+230', flag: '🇲🇺', name: 'Mauritius', currency: 'MUR', symbol: '₨' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico', currency: 'MXN', symbol: '$' },
  { code: '+691', flag: '🇫🇲', name: 'Micronesia', currency: 'USD', symbol: '$' },
  { code: '+373', flag: '🇲🇩', name: 'Moldova', currency: 'MDL', symbol: 'L' },
  { code: '+377', flag: '🇲🇨', name: 'Monaco', currency: 'EUR', symbol: '€' },
  { code: '+976', flag: '🇲🇳', name: 'Mongolia', currency: 'MNT', symbol: '₮' },
  { code: '+382', flag: '🇲🇪', name: 'Montenegro', currency: 'EUR', symbol: '€' },
  { code: '+1 664', flag: '🇲🇸', name: 'Montserrat', currency: 'XCD', symbol: '$' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco', currency: 'MAD', symbol: 'DH' },
  { code: '+258', flag: '🇲🇿', name: 'Mozambique', currency: 'MZN', symbol: 'MT' },
  { code: '+95', flag: '🇲🇲', name: 'Myanmar', currency: 'MMK', symbol: 'K' },
  { code: '+264', flag: '🇳🇦', name: 'Namibia', currency: 'NAD', symbol: '$' },
  { code: '+674', flag: '🇳🇷', name: 'Nauru', currency: 'AUD', symbol: 'A$' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal', currency: 'NPR', symbol: '₨' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands', currency: 'EUR', symbol: '€' },
  { code: '+687', flag: '🇳🇨', name: 'New Caledonia', currency: 'XPF', symbol: '₣' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand', currency: 'NZD', symbol: '$' },
  { code: '+505', flag: '🇳🇮', name: 'Nicaragua', currency: 'NIO', symbol: 'C$' },
  { code: '+227', flag: '🇳🇪', name: 'Niger', currency: 'XOF', symbol: 'CFA' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria', currency: 'NGN', symbol: '₦' },
  { code: '+683', flag: '🇳🇺', name: 'Niue', currency: 'NZD', symbol: '$' },
  { code: '+1 670', flag: '🇲🇵', name: 'Northern Mariana Islands', currency: 'USD', symbol: '$' },
  { code: '+47', flag: '🇳🇴', name: 'Norway', currency: 'NOK', symbol: 'kr' },
  { code: '+968', flag: '🇴🇲', name: 'Oman', currency: 'OMR', symbol: '﷼' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan', currency: 'PKR', symbol: '₨' },
  { code: '+680', flag: '🇵🇼', name: 'Palau', currency: 'USD', symbol: '$' },
  { code: '+970', flag: '🇵🇸', name: 'Palestine', currency: 'ILS', symbol: '₪' },
  { code: '+507', flag: '🇵🇦', name: 'Panama', currency: 'PAB', symbol: 'B/.' },
  { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea', currency: 'PGK', symbol: 'K' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguay', currency: 'PYG', symbol: 'Gs' },
  { code: '+51', flag: '🇵🇪', name: 'Peru', currency: 'PEN', symbol: 'S/.' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines', currency: 'PHP', symbol: '₱' },
  { code: '+48', flag: '🇵🇱', name: 'Poland', currency: 'PLN', symbol: 'zł' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal', currency: 'EUR', symbol: '€' },
  { code: '+1 787', flag: '🇵🇷', name: 'Puerto Rico', currency: 'USD', symbol: '$' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar', currency: 'QAR', symbol: 'QR' },
  { code: '+40', flag: '🇷🇴', name: 'Romania', currency: 'RON', symbol: 'lei' },
  { code: '+7', flag: '🇷🇺', name: 'Russia', currency: 'RUB', symbol: '₽' },
  { code: '+250', flag: '🇷🇼', name: 'Rwanda', currency: 'RWF', symbol: 'RWF' },
  { code: '+1 869', flag: '🇰🇳', name: 'Saint Kitts and Nevis', currency: 'XCD', symbol: '$' },
  { code: '+1 758', flag: '🇱🇨', name: 'Saint Lucia', currency: 'XCD', symbol: '$' },
  { code: '+1 784', flag: '🇻🇨', name: 'Saint Vincent', currency: 'XCD', symbol: '$' },
  { code: '+685', flag: '🇼🇸', name: 'Samoa', currency: 'WST', symbol: 'WS$' },
  { code: '+378', flag: '🇸🇲', name: 'San Marino', currency: 'EUR', symbol: '€' },
  { code: '+239', flag: '🇸🇹', name: 'Sao Tome and Principe', currency: 'STN', symbol: 'Db' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia', currency: 'SAR', symbol: '﷼' },
  { code: '+221', flag: '🇸🇳', name: 'Senegal', currency: 'XOF', symbol: 'CFA' },
  { code: '+381', flag: '🇷🇸', name: 'Serbia', currency: 'RSD', symbol: 'дин.' },
  { code: '+248', flag: '🇸🇨', name: 'Seychelles', currency: 'SCR', symbol: '₨' },
  { code: '+232', flag: '🇸🇱', name: 'Sierra Leone', currency: 'SLL', symbol: 'Le' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore', currency: 'SGD', symbol: 'S$' },
  { code: '+1 721', flag: '🇸🇽', name: 'Sint Maarten', currency: 'ANG', symbol: 'ƒ' },
  { code: '+421', flag: '🇸🇰', name: 'Slovakia', currency: 'EUR', symbol: '€' },
  { code: '+386', flag: '🇸🇮', name: 'Slovenia', currency: 'EUR', symbol: '€' },
  { code: '+677', flag: '🇸🇧', name: 'Solomon Islands', currency: 'SBD', symbol: '$' },
  { code: '+252', flag: '🇸🇴', name: 'Somalia', currency: 'SOS', symbol: 'S' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa', currency: 'ZAR', symbol: 'R' },
  { code: '+211', flag: '🇸🇸', name: 'South Sudan', currency: 'SSP', symbol: '£' },
  { code: '+34', flag: '🇪🇸', name: 'Spain', currency: 'EUR', symbol: '€' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka', currency: 'LKR', symbol: '₨' },
  { code: '+249', flag: '🇸🇩', name: 'Sudan', currency: 'SDG', symbol: 'ج.س.' },
  { code: '+597', flag: '🇸🇷', name: 'Suriname', currency: 'SRD', symbol: '$' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden', currency: 'SEK', symbol: 'kr' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland', currency: 'CHF', symbol: 'CHF' },
  { code: '+963', flag: '🇸🇾', name: 'Syria', currency: 'SYP', symbol: '£' },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan', currency: 'TWD', symbol: 'NT$' },
  { code: '+992', flag: '🇹🇯', name: 'Tajikistan', currency: 'TJS', symbol: 'SM' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania', currency: 'TZS', symbol: 'TSh' },
  { code: '+66', flag: '🇹🇭', name: 'Thailand', currency: 'THB', symbol: '฿' },
  { code: '+670', flag: '🇹🇱', name: 'Timor-Leste', currency: 'USD', symbol: '$' },
  { code: '+228', flag: '🇹🇬', name: 'Togo', currency: 'XOF', symbol: 'CFA' },
  { code: '+690', flag: '🇹🇰', name: 'Tokelau', currency: 'NZD', symbol: '$' },
  { code: '+676', flag: '🇹🇴', name: 'Tonga', currency: 'TOP', symbol: 'T$' },
  { code: '+1 868', flag: '🇹🇹', name: 'Trinidad and Tobago', currency: 'TTD', symbol: 'TT$' },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia', currency: 'TND', symbol: 'د.ت' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey', currency: 'TRY', symbol: '₺' },
  { code: '+993', flag: '🇹🇲', name: 'Turkmenistan', currency: 'TMT', symbol: 'T' },
  { code: '+1 649', flag: '🇹🇨', name: 'Turks and Caicos', currency: 'USD', symbol: '$' },
  { code: '+688', flag: '🇹🇻', name: 'Tuvalu', currency: 'AUD', symbol: 'A$' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda', currency: 'UGX', symbol: 'USh' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine', currency: 'UAH', symbol: '₴' },
  { code: '+971', flag: '🇦🇪', name: 'UAE', currency: 'AED', symbol: 'AED' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom', currency: 'GBP', symbol: '£' },
  { code: '+1', flag: '🇺🇸', name: 'United States', currency: 'USD', symbol: '$' },
  { code: '+598', flag: '🇺🇾', name: 'Uruguay', currency: 'UYU', symbol: '$U' },
  { code: '+998', flag: '🇺🇿', name: 'Uzbekistan', currency: 'UZS', symbol: 'лв' },
  { code: '+678', flag: '🇻🇺', name: 'Vanuatu', currency: 'VUV', symbol: 'VT' },
  { code: '+379', flag: '🇻🇦', name: 'Vatican City', currency: 'EUR', symbol: '€' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela', currency: 'VES', symbol: 'Bs.' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam', currency: 'VND', symbol: '₫' },
  { code: '+1 340', flag: '🇻🇮', name: 'US Virgin Islands', currency: 'USD', symbol: '$' },
  { code: '+681', flag: '🇼🇫', name: 'Wallis and Futuna', currency: 'XPF', symbol: '₣' },
  { code: '+967', flag: '🇾🇪', name: 'Yemen', currency: 'YER', symbol: '﷼' },
  { code: '+260', flag: '🇿🇲', name: 'Zambia', currency: 'ZMW', symbol: 'ZK' },
  { code: '+263', flag: '🇿🇼', name: 'Zimbabwe', currency: 'ZWL', symbol: '$' }
]

export default function Registration() {
  const router = useRouter()
  const [form, setForm] = useState({
    username: '',
    selectedCountry: { code: '+1', flag: '🇺🇸', name: 'United States', currency: 'USD', symbol: '$' },
    phone: '',
    inviteCode: '',
    loginPassword: '',
    confirmPassword: '',
    transactionPassword: '',
    gender: '',
  })
  const [errors, setErrors] = useState({})
  const [showCountries, setShowCountries] = useState(false)
  const [searchCountry, setSearchCountry] = useState('')
  const [showLoginPass, setShowLoginPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [showTxnPass, setShowTxnPass] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.username.trim()) newErrors.username = 'Username is required'
    if (!form.phone || !/^\d{7,15}$/.test(form.phone)) newErrors.phone = 'Enter valid phone number'
    if (!form.loginPassword) newErrors.loginPassword = 'Password is required'
    if (form.loginPassword !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!form.transactionPassword) newErrors.transactionPassword = 'Transaction password is required'
    if (!form.gender) newErrors.gender = 'Please select gender'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      const countryCode = form.selectedCountry.code
      const countryName = form.selectedCountry.name
      const countryCurrency = form.selectedCountry.currency || 'USD'
      const countrySymbol = form.selectedCountry.symbol || '$'
      const countryFlag = form.selectedCountry.flag
      const fullPhone = countryCode + form.phone

      const rawPhone = fullPhone.replace(/\D/g, '')
      const displayPhone = rawPhone.slice(-9)
      const myInvitecode = rawPhone.slice(-6) + 'MS'

      // --- VIP0 2 DAYS FLORIDA TIME LOGIC ---
      const nowFloridaStr = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
      const nowFlorida = new Date(nowFloridaStr);
      const startFlorida = new Date(nowFlorida);
      startFlorida.setHours(0,0,0,0);
      const expiryFlorida = new Date(startFlorida);
      expiryFlorida.setDate(startFlorida.getDate() + 2);
      expiryFlorida.setHours(0,0,0,0);
      // --- END VIP0 LOGIC ---

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          phone: fullPhone,
          rawPhone,
          displayPhone,
          myInvitecode,
          loginPassword: form.loginPassword,
          transactionPassword: form.transactionPassword,
          gender: form.gender,
          countryCode,
          countryName,
          currency: countryCurrency,
          currencySymbol: countrySymbol,
          flag: countryFlag,
          invitedBy: form.inviteCode || 'NO_INVITE',
          vip: 0,
          vip0Start: startFlorida.toISOString(),
          vip0Expiry: expiryFlorida.toISOString(),
          registeredAt: new Date().toISOString(),
          action: 'register'
        })
      })
      const data = await res.json()
      if (res.ok) {
        const userToSave = {
          id: data.user?.id || 'user_' + Date.now(),
          username: form.username,
          rawPhone,
          displayPhone,
          phone: fullPhone,
          invitecode: data.user?.invitecode || myInvitecode,
          vip: 0,
          vipLevel: 0,
          balance: 0,
          countryCode,
          countryName,
          currency: countryCurrency,
          currencySymbol: countrySymbol,
          flag: countryFlag,
          vip0Start: startFlorida.toISOString(),
          vip0Expiry: expiryFlorida.toISOString(),
          registeredAt: new Date().toISOString(),
        }
        localStorage.setItem('user', JSON.stringify(userToSave))
        localStorage.setItem('token', userToSave.id)
        localStorage.setItem('myInvitecode', userToSave.invitecode)
        localStorage.setItem('myDisplayPhone', displayPhone)
        localStorage.setItem('myCurrency', countryCurrency)
        localStorage.setItem('myCurrencySymbol', countrySymbol)
        localStorage.setItem('myCountryName', countryName)
        localStorage.setItem('myCountryFlag', countryFlag)
        localStorage.setItem('vip0_start', startFlorida.toISOString())
        localStorage.setItem('vip0_expiry', expiryFlorida.toISOString())
        localStorage.setItem('registeredAt', new Date().toISOString())
        localStorage.setItem('balance', '0')
        localStorage.setItem('completedTasks', JSON.stringify([]))
        localStorage.setItem('incomeHistory', JSON.stringify([]))

        setShowSuccess(true)
        setTimeout(() => router.push('/my'), 2000)
      } else {
        setErrors({ submit: data.error })
      }
    }
  }

  const inputStyle = {
    width: '100%',
    height: '56px',
    padding: '0 16px',
    fontSize: '16px',
    border: '1px solid rgba(207,168,91,0.35)',
    borderRadius: '12px',
    marginBottom: '4px',
    boxSizing: 'border-box',
    outline: 'none',
    background: 'rgba(255,255,255,0.96)',
    color: '#0F1E4A',
  }

  const selectBoxStyle = {
    width: '140px',
    height: '56px',
    padding: '0 16px',
    fontSize: '16px',
    border: '1px solid rgba(207,168,91,0.35)',
    borderRadius: '12px',
    marginBottom: '4px',
    boxSizing: 'border-box',
    outline: 'none',
    background: 'rgba(255,255,255,0.96)',
    color: '#0F1E4A',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  const errorStyle = { color: '#ff8a8a', fontSize: '14px', marginBottom: '16px' }
  const passwordWrapper = { position: 'relative', width: '100%' }
  const eyeStyle = { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '20px', userSelect: 'none' }
  const selectedCountry = form.selectedCountry
  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(searchCountry.toLowerCase()) || c.code.includes(searchCountry))

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#0A1433',
      backgroundImage: `
        radial-gradient(ellipse at 50% 0%, #1E3A8A 0%, transparent 60%),
        radial-gradient(ellipse at 20% 15%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 0% 40%, rgba(249, 115, 22, 0.15) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 45%, rgba(249, 115, 22, 0.12) 0%, transparent 40%),
        linear-gradient(180deg, #16255A 0%, #0F1E4A 35%, #0A1433 70%, #060A1A 100%)
      `,
      padding: '40px 20px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {showSuccess && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '30px 40px', borderRadius: '16px', border: '1px solid #CFA85B', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', zIndex: 10000, textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#CFA85B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff', fontSize: '28px', fontWeight: '700' }}>✓</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#000' }}>Registration Successful</div>
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <img 
                src="/main.jpg" 
                alt="Main Street Movies Logo"
                style={{
                  width: '400px',
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '24px',
                  mixBlendMode: 'screen',
                  filter: 'drop-shadow(0 0 40px rgba(207,168,91,0.5))',
                }}
              />
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 10px', color: '#FDE68A', letterSpacing: '1px', textShadow: '0 0 20px rgba(251, 191, 36, 0.6)' }}>
              MAIN STREET MOVIES WELCOMES YOU
            </h1>
            <p style={{ fontSize: '14px', color: '#C7B299', margin: '0 0 24px' }}>
              Discover trailers under the stars — Join 190+ countries
            </p>
            <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: '#fff' }}>SIGN UP</h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} style={inputStyle} />
            {errors.username && <div style={errorStyle}>{errors.username}</div>}

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div onClick={() => setShowCountries(!showCountries)} style={selectBoxStyle}>
                  <span>{selectedCountry.flag} {selectedCountry.code}</span><span>▼</span>
                </div>
                <input type="tel" placeholder="Enter a phone number" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} inputMode="numeric" style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              </div>
              {showCountries && (
                <div style={{ position: 'absolute', top: '60px', left: 0, right: 0, background: '#fff', border: '1px solid #CFA85B', borderRadius: '12px', maxHeight: '250px', overflowY: 'auto', zIndex: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}>
                  <input type="text" placeholder="Search country..." value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} style={{ width: '100%', padding: '12px', border: 'none', borderBottom: '1px solid #eee', boxSizing: 'border-box', fontSize: '14px', background: '#fff', color: '#000' }} onClick={(e) => e.stopPropagation()} />
                  {filteredCountries.map((c, idx) => (
                    <div key={`${c.name}-${c.code}-${idx}`} onClick={() => { setForm({...form, selectedCountry: c}); setShowCountries(false); setSearchCountry('') }} style={{ padding: '12px 14px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', fontSize: '16px', color: '#000' }} onMouseEnter={(e) => e.currentTarget.style.background = '#FFF8E7'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
                      {c.flag} {c.name} {c.code} - {c.currency}
                    </div>
                  ))}
                </div>
              )}
              {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
            </div>

            <input type="text" placeholder="Invite Code (Optional)" value={form.inviteCode} onChange={(e) => setForm({...form, inviteCode: e.target.value.toUpperCase()})} style={inputStyle} />

            <div style={passwordWrapper}>
              <input type={showLoginPass? 'text' : 'password'} placeholder="Login Password" value={form.loginPassword} onChange={(e) => setForm({...form, loginPassword: e.target.value})} style={inputStyle} />
              <span onClick={() => setShowLoginPass(!showLoginPass)} style={eyeStyle}>{showLoginPass? '👁️' : '👁️‍🗨️'}</span>
            </div>
            {errors.loginPassword && <div style={errorStyle}>{errors.loginPassword}</div>}

            <div style={passwordWrapper}>
              <input type={showConfirmPass? 'text' : 'password'} placeholder="Confirm Login Password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} style={inputStyle} />
              <span onClick={() => setShowConfirmPass(!showConfirmPass)} style={eyeStyle}>{showConfirmPass? '👁️' : '👁️‍🗨️'}</span>
            </div>
            {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}

            <div style={passwordWrapper}>
              <input type={showTxnPass? 'text' : 'password'} placeholder="Transaction Password" value={form.transactionPassword} onChange={(e) => setForm({...form, transactionPassword: e.target.value})} style={inputStyle} />
              <span onClick={() => setShowTxnPass(!showTxnPass)} style={eyeStyle}>{showTxnPass? '👁️' : '👁️‍🗨️'}</span>
            </div>
            {errors.transactionPassword && <div style={errorStyle}>{errors.transactionPassword}</div>}

            <div style={{...inputStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{ color: '#666' }}>Gender</span>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#0F1E4A' }}>
                  <input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={(e) => setForm({...form, gender: e.target.value})} style={{ accentColor: '#CFA85B' }} /> Male
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#0F1E4A' }}>
                  <input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={(e) => setForm({...form, gender: e.target.value})} style={{ accentColor: '#CFA85B' }} /> Female
                </label>
              </div>
            </div>
            {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
            {errors.submit && <div style={errorStyle}>{errors.submit}</div>}

            <button type="submit" style={{ width: '100%', height: '56px', background: 'linear-gradient(90deg, #CFA85B, #FDE68A, #CFA85B)', color: '#0A1433', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '800', cursor: 'pointer', marginTop: '8px', boxShadow: '0 4px 25px rgba(207,168,91,0.5)' }}>
              Submit
            </button>

            <div style={{ textAlign: 'center', fontSize: '14px', color: '#C7B299' }}>
              Already have an account? <Link href="/login" style={{ color: '#FDE68A', fontWeight: '700', borderBottom: '1px solid #CFA85B', textDecoration: 'none' }}>Sign In</Link>
            </div>

            <div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '40px' }}>
              Copyrights 2026 © Main Street Movies
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}