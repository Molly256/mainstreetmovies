'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WithdrawPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(0)
  const [phone, setPhone] = useState('')
  const [withdrawType, setWithdrawType] = useState(null)
  const [usdtNet, setUsdtNet] = useState('BEP20')
  const [mobileNet, setMobileNet] = useState('AIRTEL')
  const [amount, setAmount] = useState('')
  const [fundPass, setFundPass] = useState('')
  const [bindData, setBindData] = useState({})

  const withdrawList = [5,11,30,65,75,200,500,800,1200]

  // FULL WORLD COUNTRIES CURRENCIES BY PHONE CODE
  const COUNTRY_CURRENCY = {
    '1': { code: 'USD', symbol: '$', rate: 1, name: 'USA/Canada' },
    '1242': { code: 'BSD', symbol: 'B$', rate: 1, name: 'Bahamas' },
    '1246': { code: 'BBD', symbol: 'Bds$', rate: 2, name: 'Barbados' },
    '1264': { code: 'XCD', symbol: 'EC$', rate: 2.7, name: 'Anguilla' },
    '1268': { code: 'XCD', symbol: 'EC$', rate: 2.7, name: 'Antigua' },
    '1284': { code: 'USD', symbol: '$', rate: 1, name: 'BVI' },
    '1340': { code: 'USD', symbol: '$', rate: 1, name: 'US Virgin' },
    '1345': { code: 'KYD', symbol: 'CI$', rate: 0.82, name: 'Cayman' },
    '1441': { code: 'BMD', symbol: 'BD$', rate: 1, name: 'Bermuda' },
    '1473': { code: 'XCD', symbol: 'EC$', rate: 2.7, name: 'Grenada' },
    '1649': { code: 'USD', symbol: '$', rate: 1, name: 'Turks' },
    '1664': { code: 'XCD', symbol: 'EC$', rate: 2.7, name: 'Montserrat' },
    '1670': { code: 'USD', symbol: '$', rate: 1, name: 'Mariana' },
    '1671': { code: 'USD', symbol: '$', rate: 1, name: 'Guam' },
    '1684': { code: 'USD', symbol: '$', rate: 1, name: 'American Samoa' },
    '1758': { code: 'XCD', symbol: 'EC$', rate: 2.7, name: 'Saint Lucia' },
    '1767': { code: 'XCD', symbol: 'EC$', rate: 2.7, name: 'Dominica' },
    '1784': { code: 'XCD', symbol: 'EC$', rate: 2.7, name: 'St Vincent' },
    '1787': { code: 'USD', symbol: '$', rate: 1, name: 'Puerto Rico' },
    '1809': { code: 'DOP', symbol: 'RD$', rate: 60, name: 'Dominican' },
    '1868': { code: 'TTD', symbol: 'TT$', rate: 6.8, name: 'Trinidad' },
    '1869': { code: 'XCD', symbol: 'EC$', rate: 2.7, name: 'St Kitts' },
    '1876': { code: 'JMD', symbol: 'J$', rate: 156, name: 'Jamaica' },
    '20': { code: 'EGP', symbol: 'E£', rate: 50.5, name: 'Egypt' },
    '212': { code: 'MAD', symbol: 'DH', rate: 9.8, name: 'Morocco' },
    '213': { code: 'DZD', symbol: 'DA', rate: 135, name: 'Algeria' },
    '216': { code: 'TND', symbol: 'DT', rate: 3.1, name: 'Tunisia' },
    '218': { code: 'LYD', symbol: 'LD', rate: 4.8, name: 'Libya' },
    '220': { code: 'GMD', symbol: 'D', rate: 70, name: 'Gambia' },
    '221': { code: 'XOF', symbol: 'CFA', rate: 605, name: 'Senegal' },
    '222': { code: 'MRU', symbol: 'UM', rate: 39, name: 'Mauritania' },
    '223': { code: 'XOF', symbol: 'CFA', rate: 605, name: 'Mali' },
    '224': { code: 'GNF', symbol: 'FG', rate: 8600, name: 'Guinea' },
    '225': { code: 'XOF', symbol: 'CFA', rate: 605, name: 'Ivory Coast' },
    '226': { code: 'XOF', symbol: 'CFA', rate: 605, name: 'Burkina' },
    '227': { code: 'XOF', symbol: 'CFA', rate: 605, name: 'Niger' },
    '228': { code: 'XOF', symbol: 'CFA', rate: 605, name: 'Togo' },
    '229': { code: 'XOF', symbol: 'CFA', rate: 605, name: 'Benin' },
    '230': { code: 'MUR', symbol: 'Rs', rate: 46, name: 'Mauritius' },
    '231': { code: 'LRD', symbol: 'L$', rate: 193, name: 'Liberia' },
    '232': { code: 'SLL', symbol: 'Le', rate: 22000, name: 'Sierra Leone' },
    '233': { code: 'GHS', symbol: '₵', rate: 15.5, name: 'Ghana' },
    '234': { code: 'NGN', symbol: '₦', rate: 1600, name: 'Nigeria' },
    '235': { code: 'XAF', symbol: 'FCFA', rate: 605, name: 'Chad' },
    '236': { code: 'XAF', symbol: 'FCFA', rate: 605, name: 'CAR' },
    '237': { code: 'XAF', symbol: 'FCFA', rate: 605, name: 'Cameroon' },
    '238': { code: 'CVE', symbol: 'Esc', rate: 101, name: 'Cape Verde' },
    '239': { code: 'STN', symbol: 'Db', rate: 23, name: 'Sao Tome' },
    '240': { code: 'XAF', symbol: 'FCFA', rate: 605, name: 'Equatorial Guinea' },
    '241': { code: 'XAF', symbol: 'FCFA', rate: 605, name: 'Gabon' },
    '242': { code: 'XAF', symbol: 'FCFA', rate: 605, name: 'Congo' },
    '243': { code: 'CDF', symbol: 'FC', rate: 2800, name: 'DR Congo' },
    '244': { code: 'AOA', symbol: 'Kz', rate: 910, name: 'Angola' },
    '245': { code: 'XOF', symbol: 'CFA', rate: 605, name: 'Guinea-Bissau' },
    '246': { code: 'USD', symbol: '$', rate: 1, name: 'Diego Garcia' },
    '247': { code: 'SHP', symbol: '£', rate: 0.79, name: 'Ascension' },
    '248': { code: 'SCR', symbol: 'SR', rate: 14, name: 'Seychelles' },
    '249': { code: 'SDG', symbol: 'SD', rate: 600, name: 'Sudan' },
    '250': { code: 'RWF', symbol: 'FRw', rate: 1300, name: 'Rwanda' },
    '251': { code: 'ETB', symbol: 'Br', rate: 125, name: 'Ethiopia' },
    '252': { code: 'SOS', symbol: 'S', rate: 570, name: 'Somalia' },
    '253': { code: 'DJF', symbol: 'Fdj', rate: 177, name: 'Djibouti' },
    '254': { code: 'KES', symbol: 'KSh', rate: 129, name: 'Kenya' },
    '255': { code: 'TZS', symbol: 'TSh', rate: 2620, name: 'Tanzania' },
    '256': { code: 'UGX', symbol: 'USh', rate: 3700, name: 'Uganda' },
    '257': { code: 'BIF', symbol: 'FBu', rate: 2850, name: 'Burundi' },
    '258': { code: 'MZN', symbol: 'MT', rate: 63, name: 'Mozambique' },
    '260': { code: 'ZMW', symbol: 'K', rate: 27, name: 'Zambia' },
    '261': { code: 'MGA', symbol: 'Ar', rate: 4600, name: 'Madagascar' },
    '262': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Reunion' },
    '263': { code: 'ZWL', symbol: 'Z$', rate: 26.5, name: 'Zimbabwe' },
    '264': { code: 'NAD', symbol: 'N$', rate: 18.5, name: 'Namibia' },
    '265': { code: 'MWK', symbol: 'MK', rate: 1750, name: 'Malawi' },
    '266': { code: 'LSL', symbol: 'L', rate: 18.5, name: 'Lesotho' },
    '267': { code: 'BWP', symbol: 'P', rate: 13.6, name: 'Botswana' },
    '268': { code: 'SZL', symbol: 'L', rate: 18.5, name: 'Eswatini' },
    '269': { code: 'KMF', symbol: 'CF', rate: 450, name: 'Comoros' },
    '27': { code: 'ZAR', symbol: 'R', rate: 18.5, name: 'South Africa' },
    '290': { code: 'SHP', symbol: '£', rate: 0.79, name: 'Saint Helena' },
    '291': { code: 'ERN', symbol: 'Nfk', rate: 15, name: 'Eritrea' },
    '297': { code: 'AWG', symbol: 'ƒ', rate: 1.8, name: 'Aruba' },
    '298': { code: 'DKK', symbol: 'kr', rate: 6.9, name: 'Faroe' },
    '299': { code: 'DKK', symbol: 'kr', rate: 6.9, name: 'Greenland' },
    '30': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Greece' },
    '31': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Netherlands' },
    '32': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Belgium' },
    '33': { code: 'EUR', symbol: '€', rate: 0.92, name: 'France' },
    '34': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Spain' },
    '350': { code: 'GIP', symbol: '£', rate: 0.79, name: 'Gibraltar' },
    '351': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Portugal' },
    '352': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Luxembourg' },
    '353': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Ireland' },
    '354': { code: 'ISK', symbol: 'kr', rate: 139, name: 'Iceland' },
    '355': { code: 'ALL', symbol: 'L', rate: 92, name: 'Albania' },
    '356': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Malta' },
    '357': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Cyprus' },
    '358': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Finland' },
    '359': { code: 'BGN', symbol: 'лв', rate: 1.8, name: 'Bulgaria' },
    '36': { code: 'HUF', symbol: 'Ft', rate: 360, name: 'Hungary' },
    '370': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Lithuania' },
    '371': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Latvia' },
    '372': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Estonia' },
    '373': { code: 'MDL', symbol: 'L', rate: 17.8, name: 'Moldova' },
    '374': { code: 'AMD', symbol: '֏', rate: 390, name: 'Armenia' },
    '375': { code: 'BYN', symbol: 'Br', rate: 3.2, name: 'Belarus' },
    '376': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Andorra' },
    '377': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Monaco' },
    '378': { code: 'EUR', symbol: '€', rate: 0.92, name: 'San Marino' },
    '380': { code: 'UAH', symbol: '₴', rate: 41, name: 'Ukraine' },
    '381': { code: 'RSD', symbol: 'din', rate: 108, name: 'Serbia' },
    '382': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Montenegro' },
    '383': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Kosovo' },
    '385': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Croatia' },
    '386': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Slovenia' },
    '387': { code: 'BAM', symbol: 'KM', rate: 1.8, name: 'Bosnia' },
    '389': { code: 'MKD', symbol: 'den', rate: 56, name: 'North Macedonia' },
    '39': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Italy' },
    '40': { code: 'RON', symbol: 'lei', rate: 4.6, name: 'Romania' },
    '41': { code: 'CHF', symbol: 'CHF', rate: 0.88, name: 'Switzerland' },
    '420': { code: 'CZK', symbol: 'Kč', rate: 23, name: 'Czech' },
    '421': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Slovakia' },
    '423': { code: 'CHF', symbol: 'CHF', rate: 0.88, name: 'Liechtenstein' },
    '43': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Austria' },
    '44': { code: 'GBP', symbol: '£', rate: 0.79, name: 'UK' },
    '45': { code: 'DKK', symbol: 'kr', rate: 6.9, name: 'Denmark' },
    '46': { code: 'SEK', symbol: 'kr', rate: 10.5, name: 'Sweden' },
    '47': { code: 'NOK', symbol: 'kr', rate: 10.8, name: 'Norway' },
    '48': { code: 'PLN', symbol: 'zł', rate: 4, name: 'Poland' },
    '49': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Germany' },
    '500': { code: 'FKP', symbol: '£', rate: 0.79, name: 'Falkland' },
    '501': { code: 'BZD', symbol: 'BZ$', rate: 2, name: 'Belize' },
    '502': { code: 'GTQ', symbol: 'Q', rate: 7.7, name: 'Guatemala' },
    '503': { code: 'USD', symbol: '$', rate: 1, name: 'El Salvador' },
    '504': { code: 'HNL', symbol: 'L', rate: 24.8, name: 'Honduras' },
    '505': { code: 'NIO', symbol: 'C$', rate: 36.6, name: 'Nicaragua' },
    '506': { code: 'CRC', symbol: '₡', rate: 510, name: 'Costa Rica' },
    '507': { code: 'PAB', symbol: 'B/.', rate: 1, name: 'Panama' },
    '508': { code: 'EUR', symbol: '€', rate: 0.92, name: 'St Pierre' },
    '509': { code: 'HTG', symbol: 'G', rate: 132, name: 'Haiti' },
    '51': { code: 'PEN', symbol: 'S/', rate: 3.7, name: 'Peru' },
    '52': { code: 'MXN', symbol: '$', rate: 17.5, name: 'Mexico' },
    '53': { code: 'CUP', symbol: '$', rate: 24, name: 'Cuba' },
    '54': { code: 'ARS', symbol: '$', rate: 950, name: 'Argentina' },
    '55': { code: 'BRL', symbol: 'R$', rate: 5.6, name: 'Brazil' },
    '56': { code: 'CLP', symbol: '$', rate: 940, name: 'Chile' },
    '57': { code: 'COP', symbol: '$', rate: 4100, name: 'Colombia' },
    '58': { code: 'VES', symbol: 'Bs', rate: 36, name: 'Venezuela' },
    '590': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Guadeloupe' },
    '591': { code: 'BOB', symbol: 'Bs', rate: 6.9, name: 'Bolivia' },
    '592': { code: 'GYD', symbol: 'G$', rate: 209, name: 'Guyana' },
    '593': { code: 'USD', symbol: '$', rate: 1, name: 'Ecuador' },
    '594': { code: 'EUR', symbol: '€', rate: 0.92, name: 'French Guiana' },
    '595': { code: 'PYG', symbol: '₲', rate: 7400, name: 'Paraguay' },
    '596': { code: 'EUR', symbol: '€', rate: 0.92, name: 'Martinique' },
    '597': { code: 'SRD', symbol: '$', rate: 32, name: 'Suriname' },
    '598': { code: 'UYU', symbol: '$U', rate: 39, name: 'Uruguay' },
    '599': { code: 'ANG', symbol: 'ƒ', rate: 1.8, name: 'Curacao' },
    '60': { code: 'MYR', symbol: 'RM', rate: 4.7, name: 'Malaysia' },
    '61': { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Australia' },
    '62': { code: 'IDR', symbol: 'Rp', rate: 16200, name: 'Indonesia' },
    '63': { code: 'PHP', symbol: '₱', rate: 58, name: 'Philippines' },
    '64': { code: 'NZD', symbol: 'NZ$', rate: 1.66, name: 'New Zealand' },
    '65': { code: 'SGD', symbol: 'S$', rate: 1.32, name: 'Singapore' },
    '66': { code: 'THB', symbol: '฿', rate: 36.5, name: 'Thailand' },
    '670': { code: 'USD', symbol: '$', rate: 1, name: 'Timor' },
    '672': { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Antarctic' },
    '673': { code: 'BND', symbol: 'B$', rate: 1.32, name: 'Brunei' },
    '674': { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Nauru' },
    '675': { code: 'PGK', symbol: 'K', rate: 3.9, name: 'Papua' },
    '676': { code: 'TOP', symbol: 'T$', rate: 2.3, name: 'Tonga' },
    '677': { code: 'SBD', symbol: 'SI$', rate: 8.4, name: 'Solomon' },
    '678': { code: 'VUV', symbol: 'VT', rate: 119, name: 'Vanuatu' },
    '679': { code: 'FJD', symbol: 'FJ$', rate: 2.25, name: 'Fiji' },
    '680': { code: 'USD', symbol: '$', rate: 1, name: 'Palau' },
    '681': { code: 'XPF', symbol: '₣', rate: 110, name: 'Wallis' },
    '682': { code: 'NZD', symbol: 'NZ$', rate: 1.66, name: 'Cook Islands' },
    '683': { code: 'NZD', symbol: 'NZ$', rate: 1.66, name: 'Niue' },
    '685': { code: 'WST', symbol: 'T', rate: 2.7, name: 'Samoa' },
    '686': { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Kiribati' },
    '687': { code: 'XPF', symbol: '₣', rate: 110, name: 'New Caledonia' },
    '688': { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Tuvalu' },
    '689': { code: 'XPF', symbol: '₣', rate: 110, name: 'French Polynesia' },
    '690': { code: 'NZD', symbol: 'NZ$', rate: 1.66, name: 'Tokelau' },
    '691': { code: 'USD', symbol: '$', rate: 1, name: 'Micronesia' },
    '692': { code: 'USD', symbol: '$', rate: 1, name: 'Marshall' },
    '7': { code: 'RUB', symbol: '₽', rate: 92, name: 'Russia/Kazakhstan' },
    '81': { code: 'JPY', symbol: '¥', rate: 149, name: 'Japan' },
    '82': { code: 'KRW', symbol: '₩', rate: 1350, name: 'South Korea' },
    '84': { code: 'VND', symbol: '₫', rate: 25400, name: 'Vietnam' },
    '850': { code: 'KPW', symbol: '₩', rate: 900, name: 'North Korea' },
    '852': { code: 'HKD', symbol: 'HK$', rate: 7.8, name: 'Hong Kong' },
    '853': { code: 'MOP', symbol: 'MOP$', rate: 8, name: 'Macao' },
    '855': { code: 'KHR', symbol: '៛', rate: 4050, name: 'Cambodia' },
    '856': { code: 'LAK', symbol: '₭', rate: 21500, name: 'Laos' },
    '86': { code: 'CNY', symbol: '¥', rate: 7.2, name: 'China' },
    '880': { code: 'BDT', symbol: '৳', rate: 117, name: 'Bangladesh' },
    '886': { code: 'TWD', symbol: 'NT$', rate: 32, name: 'Taiwan' },
    '90': { code: 'TRY', symbol: '₺', rate: 34, name: 'Turkey' },
    '91': { code: 'INR', symbol: '₹', rate: 84, name: 'India' },
    '92': { code: 'PKR', symbol: 'Rs', rate: 278, name: 'Pakistan' },
    '93': { code: 'AFN', symbol: '؋', rate: 70, name: 'Afghanistan' },
    '94': { code: 'LKR', symbol: 'Rs', rate: 300, name: 'Sri Lanka' },
    '95': { code: 'MMK', symbol: 'K', rate: 2100, name: 'Myanmar' },
    '960': { code: 'MVR', symbol: 'Rf', rate: 15.4, name: 'Maldives' },
    '961': { code: 'LBP', symbol: 'LL', rate: 89500, name: 'Lebanon' },
    '962': { code: 'JOD', symbol: 'JD', rate: 0.71, name: 'Jordan' },
    '963': { code: 'SYP', symbol: 'S£', rate: 13000, name: 'Syria' },
    '964': { code: 'IQD', symbol: 'IQD', rate: 1310, name: 'Iraq' },
    '965': { code: 'KWD', symbol: 'KD', rate: 0.3, name: 'Kuwait' },
    '966': { code: 'SAR', symbol: '﷼', rate: 3.75, name: 'Saudi Arabia' },
    '967': { code: 'YER', symbol: '﷼', rate: 530, name: 'Yemen' },
    '968': { code: 'OMR', symbol: '﷼', rate: 0.38, name: 'Oman' },
    '970': { code: 'ILS', symbol: '₪', rate: 3.7, name: 'Palestine' },
    '971': { code: 'AED', symbol: 'AED', rate: 3.67, name: 'UAE' },
    '972': { code: 'ILS', symbol: '₪', rate: 3.7, name: 'Israel' },
    '973': { code: 'BHD', symbol: 'BD', rate: 0.37, name: 'Bahrain' },
    '974': { code: 'QAR', symbol: 'QR', rate: 3.64, name: 'Qatar' },
    '975': { code: 'BTN', symbol: 'Nu', rate: 84, name: 'Bhutan' },
    '976': { code: 'MNT', symbol: '₮', rate: 3400, name: 'Mongolia' },
    '977': { code: 'NPR', symbol: 'Rs', rate: 134, name: 'Nepal' },
    '98': { code: 'IRR', symbol: '﷼', rate: 42000, name: 'Iran' },
    '992': { code: 'TJS', symbol: 'SM', rate: 10.9, name: 'Tajikistan' },
    '993': { code: 'TMT', symbol: 'T', rate: 3.5, name: 'Turkmenistan' },
    '994': { code: 'AZN', symbol: '₼', rate: 1.7, name: 'Azerbaijan' },
    '995': { code: 'GEL', symbol: '₾', rate: 2.7, name: 'Georgia' },
    '996': { code: 'KGS', symbol: 'с', rate: 86, name: 'Kyrgyzstan' },
    '998': { code: 'UZS', symbol: 'soʻm', rate: 12800, name: 'Uzbekistan' },
  }

  const getCurrencyInfo = (phone) => {
    let p = String(phone || '').replace(/[^0-9]/g, '')
    if(!p) return { code: 'UGX', symbol: 'USh', rate: 3700 }
    // special case Ugandan local 07...
    if(p.startsWith('07') || p.startsWith('7')) return COUNTRY_CURRENCY['256']
    if(p.startsWith('0')) p = p.substring(1)
    // longest prefix match
    const keys = Object.keys(COUNTRY_CURRENCY).sort((a,b)=>b.length - a.length)
    for(let k of keys){
      if(p.startsWith(k)) return COUNTRY_CURRENCY[k]
    }
    // try with country code without leading 00
    if(p.startsWith('00')) {
      const p2 = p.substring(2)
      for(let k of keys){
        if(p2.startsWith(k)) return COUNTRY_CURRENCY[k]
      }
    }
    return { code: 'USD', symbol: '$', rate: 1 }
  }

  useEffect(()=>{
    const bal = localStorage.getItem('user_balance') || localStorage.getItem('balance') || '0'
    const ph = localStorage.getItem('user_phone') || localStorage.getItem('phone') || '256'
    const bind = JSON.parse(localStorage.getItem('bind_wallet') || '{}')
    setBalance(parseFloat(bal))
    setPhone(ph)
    setBindData(bind)
  },[])

  const curr = getCurrencyInfo(phone)
  const toLocal = (usd) => (Number(usd) * curr.rate).toLocaleString()

  const numericAmount = parseFloat(amount) || 0
  const fee = numericAmount > 0 ? numericAmount * 0.10 : 0
  const estimated = numericAmount > 0 ? numericAmount - fee : 0

  const getCurrentWallet = () => {
    if(withdrawType==='usdt'){
      if(usdtNet==='BEP20') return { addr: bindData.usdt_bep20 || bindData.usdt_address, name: bindData.usdt_name }
      return { addr: bindData.usdt_trc20 || bindData.usdt_trc_address, name: bindData.usdt_name }
    }else if(withdrawType==='mobile'){
      if(mobileNet==='AIRTEL') return { addr: bindData.airtel_number || bindData.airtel_wallet, name: bindData.airtel_name }
      return { addr: bindData.mtn_number || bindData.mtn_wallet, name: bindData.mtn_name }
    }
    return null
  }
  const wallet = getCurrentWallet()
  const hasWallet = wallet && wallet.addr

  return (
    <div style={{ minHeight:'100vh', background:'#F5F7FF', fontFamily:'system-ui' }}>
      <div style={{ background:'linear-gradient(90deg,#0F1E8A,#1E3A8A)', padding:'18px', textAlign:'center', borderBottom:'2px solid #CFA85B' }}>
        <h1 style={{ margin:0, color:'#FDE68A', fontWeight:'900', fontSize:'20px' }}>Withdrawal</h1>
        <div style={{ color:'#C7B299', fontSize:'10px', marginTop:'4px' }}>{phone ? `+${phone} • ${curr.code} (${curr.name})` : ''}</div>
      </div>

      <div style={{ maxWidth:'500px', margin:'0 auto', padding:'14px' }}>
        <div style={{ background:'linear-gradient(90deg,#1A2FBF,#2E4BE0)', borderRadius:'20px', padding:'18px', color:'#fff' }}>
          <div style={{ fontWeight:'800' }}>Withdrawal</div>
          <div style={{ fontSize:'12px', opacity:0.8 }}>USDT-{usdtNet}</div>
          <div style={{ marginTop:'12px', fontSize:'12px', opacity:0.8 }}>Withdrawable amount</div>
          <div style={{ fontSize:'30px', fontWeight:'900' }}>${balance.toFixed(2)}</div>
          <div style={{ fontSize:'11px' }}>{curr.symbol} {toLocal(balance)} {curr.code}</div>
        </div>

        <div style={{ marginTop:'18px', fontWeight:'800', color:'#0A1433' }}>Withdrawal Type</div>
        <div style={{ display:'flex', gap:'10px', marginTop:'8px' }}>
          <button onClick={()=>setWithdrawType('usdt')} style={{ flex:1, height:'60px', borderRadius:'14px', border: withdrawType==='usdt' ? '2px solid #CFA85B' : '1px solid #ddd', background: withdrawType==='usdt' ? '#1A2FBF' : '#fff', color: withdrawType==='usdt' ? '#FDE68A' : '#333', fontWeight:'800', cursor:'pointer' }}>USDT</button>
          <button onClick={()=>setWithdrawType('mobile')} style={{ flex:1, height:'60px', borderRadius:'14px', border: withdrawType==='mobile' ? '2px solid #CFA85B' : '1px solid #ddd', background: withdrawType==='mobile' ? '#1A2FBF' : '#fff', color: withdrawType==='mobile' ? '#FDE68A' : '#333', fontWeight:'800', cursor:'pointer' }}>MOBILE MONEY</button>
        </div>

        {withdrawType==='usdt' && (
          <div style={{ display:'flex', gap:'8px', marginTop:'10px' }}>
            <button onClick={()=>setUsdtNet('BEP20')} style={{ flex:1, height:'40px', borderRadius:'10px', border: usdtNet==='BEP20' ? '2px solid #1A2FBF' : '1px solid #ddd', background:'#fff', fontWeight:'700', fontSize:'12px' }}>BEP20-USDT</button>
            <button onClick={()=>setUsdtNet('TRC20')} style={{ flex:1, height:'40px', borderRadius:'10px', border: usdtNet==='TRC20' ? '2px solid #1A2FBF' : '1px solid #ddd', background:'#fff', fontWeight:'700', fontSize:'12px' }}>TRC20-USDT</button>
          </div>
        )}
        {withdrawType==='mobile' && (
          <div style={{ display:'flex', gap:'8px', marginTop:'10px' }}>
            <button onClick={()=>setMobileNet('AIRTEL')} style={{ flex:1, height:'40px', borderRadius:'10px', border:'1px solid #ddd', background:'#fff', color:'#FF0000', fontWeight:'800', fontSize:'11px' }}>AIRTEL</button>
            <button onClick={()=>setMobileNet('MTN')} style={{ flex:1, height:'40px', borderRadius:'10px', border:'1px solid #ddd', background:'#fff', color:'#000', fontWeight:'800', fontSize:'11px' }}>MTN</button>
          </div>
        )}

        {withdrawType && (
          <div style={{ marginTop:'16px' }}>
            <div style={{ fontSize:'12px', color:'#666', marginBottom:'6px' }}>Withdrawal Address</div>
            <div style={{ background:'#fff', borderRadius:'12px', padding:'14px', border:'1px solid #ddd', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              {hasWallet ? <div><div style={{ fontWeight:'700', fontSize:'13px' }}>{wallet.name}</div><div style={{ fontSize:'12px', wordBreak:'break-all' }}>{wallet.addr}</div></div> : <div style={{ fontSize:'12px', color:'#999' }}>Please bind address</div>}
              {!hasWallet ? (
                <button onClick={()=>router.push('/bind-wallet')} style={{ background:'#2E4BE0', color:'#000', fontWeight:'600', border:'none', borderRadius:'20px', padding:'7px 14px', fontSize:'12px', cursor:'pointer' }}>Bind Wallet</button>
              ) : <button onClick={()=>router.push('/bind-wallet')} style={{ background:'none', border:'none', color:'#1A2FBF', fontSize:'11px' }}>Change</button>}
            </div>
          </div>
        )}

        <div style={{ marginTop:'16px' }}>
          <div style={{ fontSize:'12px', color:'#666', marginBottom:'6px' }}>Withdrawal amount</div>
          <div style={{ background:'#fff', borderRadius:'12px', padding:'12px', border:'1px solid #ddd' }}>
            <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Please enter withdrawal amount" type="number" style={{ width:'100%', border:'none', outline:'none' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px', marginTop:'10px' }}>
            {withdrawList.map(v=>(
              <button key={v} onClick={()=>setAmount(String(v))} style={{ background: amount==v ? '#0F1E8A' : '#fff', color: amount==v ? '#FDE68A' : '#0A1433', border:'1px solid #ddd', borderRadius:'10px', padding:'8px', cursor:'pointer' }}>
                <div style={{ fontWeight:'800', fontSize:'13px' }}>${v}</div>
                <div style={{ fontSize:'10px' }}>{curr.symbol} {toLocal(v)}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop:'16px', background:'#2E4BE0', borderRadius:'12px', padding:'14px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
            <span style={{ color:'#000', fontWeight:'600', fontSize:'13px' }}>Withdrawal fees (10%)</span>
            <div style={{ textAlign:'right' }}>
              <div style={{ color:'#000', fontWeight:'600', fontSize:'13px' }}>{fee.toFixed(2)} USDT</div>
              <div style={{ color:'#000', fontWeight:'500', fontSize:'11px' }}>{curr.symbol} {toLocal(fee)} {curr.code}</div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <span style={{ color:'#000', fontWeight:'600', fontSize:'13px' }}>Estimated amount received</span>
            <div style={{ textAlign:'right' }}>
              <div style={{ color:'#000', fontWeight:'600', fontSize:'13px' }}>{estimated.toFixed(2)} USDT</div>
              <div style={{ color:'#000', fontWeight:'500', fontSize:'11px' }}>{curr.symbol} {toLocal(estimated)} {curr.code}</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop:'16px' }}>
          <div style={{ fontSize:'12px', color:'#666', marginBottom:'6px' }}>Fund Password</div>
          <div style={{ background:'#fff', borderRadius:'12px', padding:'12px', border:'1px solid #ddd' }}>
            <input type="password" value={fundPass} onChange={e=>setFundPass(e.target.value)} placeholder="Please enter fund password" style={{ width:'100%', border:'none', outline:'none' }} />
          </div>
        </div>

        <button style={{ width:'100%', height:'52px', marginTop:'18px', background:'linear-gradient(90deg,#0F1E8A,#1E3A8A)', color:'#FDE68A', border:'none', borderRadius:'14px', fontWeight:'900', fontSize:'14px', cursor:'pointer' }}>
          Withdrawal {numericAmount ? `$${numericAmount} / ${curr.symbol} ${toLocal(numericAmount)} ${curr.code}` : 'Now'}
        </button>

        <div style={{ marginTop:'20px', background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #eee' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px' }}>
            <div style={{ width:'32px', height:'32px', background:'#FFE3E8', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>ℹ️</div>
            <div><div style={{ fontWeight:'800', fontSize:'14px' }}>Withdrawal rules</div><div style={{ fontSize:'11px', color:'#E91E63', fontWeight:'700' }}>MainStreetMovies</div></div>
          </div>
          <div style={{ display:'flex', gap:'12px', marginBottom:'14px' }}>
            <div style={{ minWidth:'28px', height:'28px', background:'#FFF0F3', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', color:'#E91E63' }}>01</div>
            <div><div style={{ fontWeight:'700', fontSize:'13px' }}>Withdrawal rules</div><div style={{ fontSize:'12px', color:'#666', marginTop:'2px' }}>MainStreetMovies supports withdrawals to TRC20-USDT, BEP20-USDT and MOBILE MONEY WALLET like AIRTEL and MTN networks only. Before withdrawing, link your withdrawal address.</div></div>
          </div>
          <div style={{ display:'flex', gap:'12px', marginBottom:'14px' }}>
            <div style={{ minWidth:'28px', height:'28px', background:'#FFF0F3', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', color:'#E91E63' }}>02</div>
            <div><div style={{ fontWeight:'700', fontSize:'13px' }}>Withdrawal fees</div><div style={{ fontSize:'12px', color:'#666' }}>10% fee</div></div>
          </div>
          <div style={{ display:'flex', gap:'12px', marginBottom:'14px' }}>
            <div style={{ minWidth:'28px', height:'28px', background:'#FFF0F3', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', color:'#E91E63' }}>03</div>
            <div><div style={{ fontWeight:'700', fontSize:'13px' }}>Withdrawal amount</div><div style={{ fontSize:'12px', color:'#666' }}>$5 - $1200 USDT</div></div>
          </div>
          <div style={{ display:'flex', gap:'12px', marginBottom:'14px' }}>
            <div style={{ minWidth:'28px', height:'28px', background:'#FFF0F3', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', color:'#E91E63' }}>04</div>
            <div><div style={{ fontWeight:'700', fontSize:'13px' }}>Withdrawal days</div><div style={{ fontSize:'12px', color:'#666' }}>Monday to Friday</div></div>
          </div>
          <div style={{ display:'flex', gap:'12px', marginBottom:'16px' }}>
            <div style={{ minWidth:'28px', height:'28px', background:'#FFF0F3', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', color:'#E91E63' }}>05</div>
            <div><div style={{ fontWeight:'700', fontSize:'13px' }}>Withdrawal time</div><div style={{ fontSize:'12px', color:'#666' }}>9:00 - 7:00 PM UK time.</div></div>
          </div>
          <div style={{ borderTop:'1px solid #eee', paddingTop:'12px', textAlign:'center', fontSize:'11px', color:'#999', fontWeight:'600' }}>Copyright 2026 MainStreetMovies</div>
        </div>
      </div>
    </div>
  )
}