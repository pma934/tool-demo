const LIST_TYPE = [{
        value: 0,
        label: "支持全部",
    },
    {
        value: 1,
        label: "白名单",
    },
    {
        value: -1,
        label: "黑名单",
    },
];

const COUNTRY_INDEX = [{
        index: 0,
        label: 'Austria',
    },
    {
        index: 1,
        label: 'Belgium',
    },
    {
        index: 2,
        label: 'Croatia',
    },
    {
        index: 3,
        label: 'Czech',
    },
    {
        index: 4,
        label: 'Denmark',
    },
    {
        index: 5,
        label: 'Finland',
    },
    {
        index: 6,
        label: 'France',
    },
    {
        index: 7,
        label: 'Germany',
    },
    {
        index: 8,
        label: 'Greece',
    },
    {
        index: 9,
        label: 'Hungary',
    },
    {
        index: 10,
        label: 'Italy',
    },
    {
        index: 11,
        label: 'Netherlands',
    },
    {
        index: 12,
        label: 'Norway',
    },
    {
        index: 13,
        label: 'Poland',
    },
    {
        index: 14,
        label: 'Portugal',
    },
    {
        index: 15,
        label: 'Romania',
    },
    {
        index: 16,
        label: 'Serbia',
    },
    {
        index: 17,
        label: 'Slovakia',
    },
    {
        index: 18,
        label: 'Slovenia',
    },
    {
        index: 19,
        label: 'Spain',
    },
    {
        index: 20,
        label: 'Sweden',
    },
    {
        index: 21,
        label: 'Switzerland',
    },
    {
        index: 22,
        label: 'UnitedKingdom',
    },
    {
        index: 23,
        label: 'UnitedStates',
    },
    {
        index: 24,
        label: 'Canada',
    },
    {
        index: 25,
        label: 'Afghanistan',
    },
    // {
    //     index: 26,
    //     label: 'AfricaOther',
    //      // },
    {
        index: 27,
        label: 'Albania',
    },
    {
        index: 28,
        label: 'Algeria',
    },
    {
        index: 29,
        label: 'Andorra',
    },
    {
        index: 30,
        label: 'Angola',
    },
    {
        index: 31,
        label: 'Anguilla',
    },
    {
        index: 32,
        label: 'Antarctica',
    },
    {
        index: 33,
        label: 'AntiguaAndBarbuda',
    },
    {
        index: 34,
        label: 'Argentina',
    },
    {
        index: 35,
        label: 'Armenia',
    },
    {
        index: 36,
        label: 'Aruba',
    },
    // {
    //     index: 37,
    //     label: 'Asia',
    //      // },
    // {
    //     index: 38,
    //     label: 'AsiaOther',
    //      // },
    {
        index: 39,
        label: 'Australia',
    },
    {
        index: 40,
        label: 'Azerbaijan',
    },
    {
        index: 41,
        label: 'Bahamas',
    },
    {
        index: 42,
        label: 'Bahrain',
    },
    {
        index: 43,
        label: 'Bangladesh',
    },
    {
        index: 44,
        label: 'Barbados',
    },
    {
        index: 45,
        label: 'Belarus',
    },
    {
        index: 46,
        label: 'Belize',
    },
    {
        index: 47,
        label: 'Benin',
    },
    {
        index: 48,
        label: 'Bermuda',
    },
    {
        index: 49,
        label: 'Bhutan',
    },
    {
        index: 50,
        label: 'Bolivia',
    },
    {
        index: 51,
        label: 'Bonaire',
    },
    {
        index: 52,
        label: 'BosniaAndHerzegovina',
    },
    {
        index: 53,
        label: 'Botswana',
    },
    {
        index: 54,
        label: 'Brazil',
    },
    {
        index: 55,
        label: 'Brunei',
    },
    {
        index: 56,
        label: 'Bulgaria',
    },
    {
        index: 57,
        label: 'BurkinaFaso',
    },
    {
        index: 58,
        label: 'Burma',
    },
    {
        index: 59,
        label: 'Burundi',
    },
    {
        index: 60,
        label: 'Cambodia',
    },
    {
        index: 61,
        label: 'Cameroon',
    },
    {
        index: 62,
        label: 'CapeVerde',
    },
    {
        index: 63,
        label: 'CaymanIslands',
    },
    {
        index: 64,
        label: 'CentralAfricanRepublic',
    },
    {
        index: 65,
        label: 'Chad',
    },
    {
        index: 66,
        label: 'Chile',
    },
    {
        index: 67,
        label: 'Colombia',
    },
    {
        index: 68,
        label: 'Comoros',
    },
    {
        index: 69,
        label: 'Congo_Brazzaville',
    },
    {
        index: 70,
        label: 'Congo_Kinshasa',
    },
    {
        index: 71,
        label: 'CookIslands',
    },
    {
        index: 72,
        label: 'CostaRica',
    },
    {
        index: 73,
        label: 'CoteD_Ivoire',
    },
    {
        index: 74,
        label: 'Curacao',
    },
    {
        index: 75,
        label: 'Cyprus',
    },
    {
        index: 76,
        label: 'Djibouti',
    },
    {
        index: 77,
        label: 'Dominica',
    },
    {
        index: 78,
        label: 'DominicanRepublic',
    },
    {
        index: 79,
        label: 'Ecuador',
    },
    {
        index: 80,
        label: 'Egypt',
    },
    {
        index: 81,
        label: 'ElSalvador',
    },
    {
        index: 82,
        label: 'EquatorialGuinea',
    },
    {
        index: 83,
        label: 'Eritrea',
    },
    {
        index: 84,
        label: 'Estonia',
    },
    {
        index: 85,
        label: 'Ethiopia',
    },
    // {
    //     index: 86,
    //     label: 'EuropeOther',
    //      // },
    {
        index: 87,
        label: 'FalklandIslands_Malvinas',
    },
    {
        index: 88,
        label: 'Fiji',
    },
    {
        index: 89,
        label: 'FrenchGuiana',
    },
    {
        index: 90,
        label: 'FrenchPolynesia',
    },
    {
        index: 91,
        label: 'Gabon',
    },
    {
        index: 92,
        label: 'Gambia',
    },
    {
        index: 93,
        label: 'Georgia',
    },
    {
        index: 94,
        label: 'Ghana',
    },
    {
        index: 95,
        label: 'Greenland',
    },
    {
        index: 96,
        label: 'Grenada',
    },
    {
        index: 97,
        label: 'Guadeloupe',
    },
    {
        index: 98,
        label: 'Guatemala',
    },
    {
        index: 99,
        label: 'Guinea',
    },
    {
        index: 100,
        label: 'Guinea_Bissau',
    },
    {
        index: 101,
        label: 'Guyana',
    },
    {
        index: 102,
        label: 'Haiti',
    },
    {
        index: 103,
        label: 'Honduras',
    },
    {
        index: 104,
        label: 'HongKong_China',
    },
    {
        index: 105,
        label: 'Iceland',
    },
    {
        index: 106,
        label: 'India',
    },
    {
        index: 107,
        label: 'Indonesia',
    },
    {
        index: 108,
        label: 'Iraq',
    },
    {
        index: 109,
        label: 'Ireland',
    },
    {
        index: 110,
        label: 'Israel',
    },
    {
        index: 111,
        label: 'Jamaica',
    },
    {
        index: 112,
        label: 'Japan',
    },
    {
        index: 113,
        label: 'Jordan',
    },
    {
        index: 114,
        label: 'Kazakstan',
    },
    {
        index: 115,
        label: 'Kenya',
    },
    {
        index: 116,
        label: 'Kiribati',
    },
    {
        index: 117,
        label: 'Korea',
    },
    {
        index: 118,
        label: 'Kosovo',
    },
    {
        index: 119,
        label: 'Kuwait',
    },
    {
        index: 120,
        label: 'Kyrgyzstan',
    },
    {
        index: 121,
        label: 'Laos',
    },
    {
        index: 122,
        label: 'Latvia',
    },
    {
        index: 123,
        label: 'Lebanon',
    },
    {
        index: 124,
        label: 'Lesotho',
    },
    {
        index: 125,
        label: 'Liberia',
    },
    {
        index: 126,
        label: 'Libya',
    },
    {
        index: 127,
        label: 'Liechtenstein',
    },
    {
        index: 128,
        label: 'Lithuania',
    },
    {
        index: 129,
        label: 'Luxembourg',
    },
    {
        index: 130,
        label: 'Macao_China',
    },
    {
        index: 131,
        label: 'NorthMacedonia',
    },
    {
        index: 132,
        label: 'Madagascar',
    },
    {
        index: 133,
        label: 'MainlandChina',
    },
    {
        index: 134,
        label: 'Malaysia',
    },
    {
        index: 135,
        label: 'Malawi',
    },
    {
        index: 136,
        label: 'Maldives',
    },
    {
        index: 137,
        label: 'Mali',
    },
    {
        index: 138,
        label: 'Malta',
    },
    {
        index: 139,
        label: 'MarshallIslands',
    },
    {
        index: 140,
        label: 'Martinique',
    },
    {
        index: 141,
        label: 'Mauritania',
    },
    {
        index: 142,
        label: 'Mauritius',
    },
    {
        index: 143,
        label: 'Mexico',
    },
    {
        index: 144,
        label: 'Micronesia',
    },
    {
        index: 145,
        label: 'Moldova',
    },
    {
        index: 146,
        label: 'Monaco',
    },
    {
        index: 147,
        label: 'Mongolia',
    },
    {
        index: 148,
        label: 'Montenegro',
    },
    {
        index: 149,
        label: 'Montserrat',
    },
    {
        index: 150,
        label: 'Morocco',
    },
    {
        index: 151,
        label: 'Mozambique',
    },
    {
        index: 152,
        label: 'Namibia',
    },
    {
        index: 153,
        label: 'Nauru',
    },
    {
        index: 154,
        label: 'Nepal',
    },
    {
        index: 155,
        label: 'NewCaledonia',
    },
    {
        index: 156,
        label: 'NewZealand',
    },
    {
        index: 157,
        label: 'Nicaragua',
    },
    {
        index: 158,
        label: 'Niger',
    },
    {
        index: 159,
        label: 'Nigeria',
    },
    // {
    //     index: 160,
    //     label: 'OceaniaOther',
    //      // },
    {
        index: 161,
        label: 'Oman',
    },
    {
        index: 162,
        label: 'Palau',
    },
    {
        index: 163,
        label: 'Pakistan',
    },
    {
        index: 164,
        label: 'Palestine',
    },
    {
        index: 165,
        label: 'Panama',
    },
    {
        index: 166,
        label: 'PapuaNewGuinea',
    },
    {
        index: 167,
        label: 'Paraguay',
    },
    {
        index: 168,
        label: 'Peru',
    },
    {
        index: 169,
        label: 'Philippines',
    },
    {
        index: 170,
        label: 'PuertoRico',
    },
    {
        index: 171,
        label: 'Qatar',
    },
    {
        index: 172,
        label: 'Russia',
    },
    {
        index: 173,
        label: 'Rwanda',
    },
    {
        index: 174,
        label: 'SaintBarthelemy',
    },
    {
        index: 175,
        label: 'SaintKittsAndNevis',
    },
    {
        index: 176,
        label: 'SaintLucia',
    },
    {
        index: 177,
        label: 'SaintMartin_FrenchPart',
    },
    {
        index: 178,
        label: 'SaintPierreAndMiquelon',
    },
    {
        index: 179,
        label: 'SaintVincentAndTheGrenadines',
    },
    {
        index: 180,
        label: 'Samoa',
    },
    {
        index: 181,
        label: 'SanMarino',
    },
    {
        index: 182,
        label: 'SaoTomeAndPrincipe',
    },
    {
        index: 183,
        label: 'SaudiArabia',
    },
    {
        index: 184,
        label: 'Senegal',
    },
    {
        index: 185,
        label: 'Seychelles',
    },
    {
        index: 186,
        label: 'SierraLeone',
    },
    {
        index: 187,
        label: 'Singapore',
    },
    {
        index: 188,
        label: 'SintMaarten_DutchPart',
    },
    {
        index: 189,
        label: 'Somalia',
    },
    {
        index: 190,
        label: 'SouthAfrica',
    },
    {
        index: 191,
        label: 'SriLanka',
    },
    {
        index: 192,
        label: 'Suriname',
    },
    {
        index: 193,
        label: 'Swaziland',
    },
    {
        index: 194,
        label: 'Tajikistan',
    },
    {
        index: 195,
        label: 'Tanzania',
    },
    {
        index: 196,
        label: 'Taiwan_China',
    },
    {
        index: 197,
        label: 'Thailand',
    },
    {
        index: 198,
        label: 'Timor_Leste',
    },
    {
        index: 199,
        label: 'Togo',
    },
    {
        index: 200,
        label: 'Tonga',
    },
    {
        index: 201,
        label: 'TrinidadAndTobago',
    },
    {
        index: 202,
        label: 'Tunisia',
    },
    {
        index: 203,
        label: 'Turkey',
    },
    {
        index: 204,
        label: 'Turkmenistan',
    },
    {
        index: 205,
        label: 'TurksAndCaicosIslands',
    },
    {
        index: 206,
        label: 'Uganda',
    },
    {
        index: 207,
        label: 'Ukraine',
    },
    {
        index: 208,
        label: 'UnitedArabEmirates',
    },
    {
        index: 210,
        label: 'Uruguay',
    },
    {
        index: 211,
        label: 'Uzbekistan',
    },
    {
        index: 212,
        label: 'Vanuatu',
    },
    {
        index: 213,
        label: 'Vatican',
    },
    {
        index: 214,
        label: 'Venezuela',
    },
    {
        index: 215,
        label: 'Vietnam',
    },
    {
        index: 216,
        label: 'VirginIslands_British',
    },
    {
        index: 217,
        label: 'VirginIslands_US',
    },
    {
        index: 218,
        label: 'Yemen',
    },
    {
        index: 219,
        label: 'Zambia',
    },
    {
        index: 220,
        label: 'Zimbabwe',
    },
    {
        index: 221,
        label: 'NorthernMarianaIslands',
    },
    {
        index: 222,
        label: 'Guam',
    },
    {
        index: 223,
        label: 'AmericanSamoa',
    },
    {
        index: 224,
        label: 'BritishIndianOceanTerritory',
    },
    {
        index: 225,
        label: 'Sudan',
    },
    {
        index: 226,
        label: 'Mayotte',
    },
    {
        index: 227,
        label: 'SaintHelena',
    },
    {
        index: 228,
        label: 'FaroeIslands',
    },
    {
        index: 289,
        label: 'Gibraltar',
    },
    {
        index: 290,
        label: 'NorfolkIsland',
    },
    {
        index: 291,
        label: 'SolomonIslands',
    },
    {
        index: 292,
        label: 'Niue',
    },
    {
        index: 293,
        label: 'WallisandFutuna',
    },
    {
        index: 294,
        label: 'Tuvalu',
    },
    {
        index: 295,
        label: 'Tokelau',
    },
    {
        index: 296,
        label: 'Syria',
    }
];

const LANGUAGE_NAME = {
    "ar": "ar",
    "bg": "bg",
    "cs": "cs",
    "da": "da",
    "de": "de",
    "el": "el",
    "en": "en",
    "es": "es",
    "et": "et",
    "fa": "fa",
    "fi": "fi",
    "fr": "fr",
    "he": "he",
    "hr": "hr",
    "hu": "hu",
    "id": "in", //India
    "it": "it",
    "ja": "ja",
    "kk": "kk",
    "ko": "ko",
    "lt": "lt",
    "lv": "lv",
    "nb": "no", // APP:Norwegian Bokmal \ WEB:Norway
    "nl": "nl",
    "pl": "pl",
    "pt-BR": "pt_BR",
    "pt-PT": "pt",
    "ro": "ro",
    "ru": "ru",
    "sk": "sk",
    "sl": "sl",
    "sr": "sr",
    "sv": "sv",
    "th": "th",
    "tr": "tr",
    "uk": "uk",
    "uz": "uz",
    "vi": "vi",
    "zh-Hant": "zh_TW"
}

module.exports = {
    LIST_TYPE,
    COUNTRY_INDEX,
    LANGUAGE_NAME
}