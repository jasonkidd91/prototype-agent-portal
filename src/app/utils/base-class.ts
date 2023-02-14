export abstract class BaseClass {
    notEmptyString(value: string) {
        return value != null && value != undefined && value.trim() != '';
    }
}