import * as Yup from 'yup';
import { IMessage } from '../models/models';

export const validationSchema: Yup.SchemaOf<IMessage> = Yup.object().shape({
    id: Yup.string().required('id is required'),
    messageId: Yup.string().required('messageId is required'),
    layer: Yup.number().required('layer is required'),
    name: Yup.string().required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    homePage: Yup.string().url('url is invaild').optional(),
    text: Yup.string().required('text is required'),
    created: Yup.date().required('date is required'),
    loadFile: Yup.string().optional(),
    token: Yup.string().required('failed to check Captcha'),
})