/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.getValidationResult = this.getValidationResult.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            type: 'password',
            hindMode: this.props.hintMode,
        };
    }

    toggleShow() {
        this.setState({
            type: this.state.type === 'password' ? 'text' : 'password',
        });
    }

    getValidationResult() {
        if (!this.props.onValidate) {
            return '';
        }

        const validationResult = this.props.onValidate(this.props.value);

        if (validationResult === true || validationResult === 'success') {
            return 'has-success';
        } else if (validationResult === false || validationResult === 'error') {
            return 'has-error';
        } else if (validationResult === 'warning') {
            return 'has-warning';
        }

        return '';
    }

    getClass() {
        if (this.props.value.length > 0) {
            return `${this.props.labelClass} active`;
        }
        return this.props.labelClass;
    }

    renderRightAddon() {
        if (this.props.rightAddonToggleType) {
            const className = `${this.props.rightAddon} ${this.state.type !== 'password' ? 'active' : ''}`;
            return (<span className={className} onClick={this.toggleShow}>{this.props.rightAddon.text}</span>);
        }
        if (this.props.rightAddon) {
            return (<span className={this.props.rightAddon}>{this.props.rightAddonText}</span>);
        }
        return '';
    }

    onFocus(e) {
        if (this.props.hintMode) {
            this.setState({
                hintMode: true,
            });
        }
        this.props.onFocus(e);
    }

    onBlur(e) {
        if (this.props.hintMode) {
            this.setState({
                hintMode: false,
            });
        }
        this.props.onBlur(e);
    }

    onChange(key, e) {
        if (this.props.hintMode) {
            this.setState({
                hintMode: false,
            });
        }
        this.props.onChange(key, e.target.value);
    }
    render() {
        return (

            <label htmlFor={this.props.refkey}>
                { this.props.leftAddon || '' }
                { this.props.leftSecondAddon ? this.props.leftSecondAddonNode : '' }
                <label
                    className={this.getClass()}
                    onClick={(e) => {
                        e.target.nextSibling.focus();
                    }}
                >{this.props.title}
                </label>
                <input
                    title={this.props.inputTitle}
                    type={this.props.rightAddonToggleType ? this.state.type : this.props.type}
                    id={this.props.refkey}
                    onKeyDown={this.props.keyDown}
                    onKeyPress={this.props.keyPress}
                    placeholder={this.props.placeholder}
                    className={this.props.className}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={this.props.value}
                    onChange={(e)=>this.onChange(this.props.refkey, e)}
                    autoFocus={this.props.autoFocus}
                />
                {this.props.children}
                { this.renderRightAddon() }
                { this.state.hintMode ? this.props.hintTextNode : ''}
            </label>
        );
    }
}

Input.propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onValidate: PropTypes.func,
    className: PropTypes.string,
    inputClass: PropTypes.string,
    inputTitle: PropTypes.string,
    labelClass: PropTypes.string,
    type: PropTypes.string.isRequired,
    leftAddon: PropTypes.node,
    leftSecondAddon: PropTypes.bool,
    leftSecondAddonNode: PropTypes.node,
    rightAddon: PropTypes.string,
    rightAddonText: PropTypes.string,
    rightAddonToggleType: PropTypes.bool,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    autoFocus: PropTypes.bool,
    refkey: PropTypes.string,
    keyPress: PropTypes.func,
    keyDown: PropTypes.func,
};

Input.defaultProps = {
    onFocus: () => {},
    onBlur: () => {},
    keyDown: () => {},
    keyPress: () => {},
    leftSecondAddon: false,
    refkey: '',
    inputTitle: '',
    rightAddonText: '',
    hintTextNode: '',
    hintMode: false,
    className: '',
    inputClass: 'form-control',
    labelClass: 'control-label',
    type: 'text',
    placeholder: '',
    title: '',
    value: '',
    autoFocus: false,
};
