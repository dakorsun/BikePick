import axios from 'axios';
import { SubmissionError } from 'redux-form';

const API = {
    user: {
        login: credentials => axios.post('/api/auth', { credentials }).then(res => res.data.user),
        signup: user => axios.post('/api/users', { user }).then(res => res.data.user),
        confirm: token => axios.post('/api/auth/confirmation', { token }).then(res => res.data.user),
        resetPasswordRequest: email => axios.post('/api/auth/reset_password_request', { email }),
        validateToken: token => axios.post('/api/auth/validate_token', { token }),
        resetPassword: data => axios.post('/api/auth/reset_password', { data }),
        me: () => axios.get('/api/users').then(res => res.data.user),
        update: updateFields => axios.post('/api/users/update', updateFields).then(res => res.data.user),
    }
};

// apply interceptor on response
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            throw new SubmissionError(error.response.data.payload);
        }
    }
);

export default API;
