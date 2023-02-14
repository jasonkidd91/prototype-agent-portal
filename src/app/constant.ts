export class Constant {
    static readonly DEFAULT_VALUE = {
        COUNTRY: {
            CODE: 'MY'/*,
            CALLING_CODE: '+60'*/
        },
        PHONE_NUMBER: {
            TYPE: 'PRIMARY'
        },
        EMAIL: {
            TYPE: 'PRIMARY'
        },
        ADDRESS: {
            TYPE: 'PRIMARY'
        },
        GENDER: {
            CODE: 'M'
        },
        LANGUAGE_CODE: 'EN',
        OTHER: 'OTHER',
        BUSINESS: {
            TYPE: 'EMPLOYEE'
        },
        LOAN_PROVIDER: {
            TYPE: 'AGENT'
        }
    };

    static readonly REGEX = {
        PATTERN: {
            NUMBER_ONLY: '^[0-9]*$',
            PHONE_NUMBER: '^\\+?(\\d{0,15})$',
            POSTAL_CODE: '^\\d{5,5}$'
        }
    }

    static readonly API = {
        SERVER_URL: 'http://192.168.1.174:8080',
        URI: {
            CUSTOM: '/custom',
            PUBLIC: '/public',
            PEOPLE: '/people',
            STATE: '/state',
            USER: '/user',
            LOAN_TYPE: '/loan-type',
            PAYMENT_TERM: '/payment-term',
            BUSINESS_TYPE: '/business-type',
            LOAN_PROVIDER_TYPE: '/loan-provider-type',
            BANK: '/bank',
            LOAN: '/loan',
            PACKAGE: '/package'
        }
    };

    static readonly ERROR_CODE = {
        FIREBASE: {
            AUTH: {
                EMAIL_IN_USE: 'auth/email-already-in-use'
            }
        }
    };

    static readonly PARAMETER = {
        FIREBASE_TOKEN: 'X-Firebase-Auth',
        LANGUAGE_CODE: 'SWS-Language-Code'
    };

    static readonly VALUE = {
        BANK: 'BANK'
    }
}