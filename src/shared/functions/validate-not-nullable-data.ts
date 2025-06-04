import { ErrorMessageProps } from "../components/error-message";

const validateNotNullableData = (field: string, value?: string): ErrorMessageProps => {
    if (value === undefined || value.replaceAll(' ',  '') === '') {
        return {
            showing: true,
            message: `El valor de ${field} no puede estar vacío`
        }
    }

    return { showing: false };
}

export default validateNotNullableData;