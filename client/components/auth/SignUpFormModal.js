import React, { PureComponent } from 'react';
import { func, bool } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Modal from "react-responsive-modal";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";
import { usersSelector } from "../../reducers/user";
import { signup } from "../../actions/auth";

@withTranslation()
class SignUpFormModal extends PureComponent {

    static propTypes = {
        onClose: func.isRequired,
        open: bool.isRequired,
        doSignup: func.isRequired,
        onSuccess: func.isRequired,
    };

    render() {
        const { onClose, open, doSignup, onSuccess } = this.props;
        return (
            <Modal open={open} onClose={onClose} center>
                <div className="login">
                    <h1 className="login--title">{this.props.t('common.register')}</h1>
                    <SignUpForm onSubmit={doSignup} onSuccess={onSuccess}/>
                </div>
            </Modal>
        );
    }
}

export default connect(
    state => ({
        user: usersSelector(state).loggedInUser,
    }),
    {
        doSignup: signup,
    },
)(SignUpFormModal);
