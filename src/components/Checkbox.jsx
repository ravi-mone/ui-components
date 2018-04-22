import React from 'react';
import PropTypes from 'prop-types';


class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false,
        };

        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    }

    toggleCheckboxChange() {
        const { handleCheckboxChange } = this.props;

        this.setState(({ isChecked }) => ({
            isChecked: !isChecked,
        }
        ), () => {
            handleCheckboxChange(this.state.isChecked);
        });
    }

    render() {
        const { label, children } = this.props;
        const { isChecked } = this.state;

        return (
            <div className="checkbox-div">
                <label htmlFor={label} className="chkbox-container">
                    {children}
                    <input
                        className="checkbox-val"
                        type="checkbox"
                        id={label}
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />
                    <span className="checkmark" />
                </label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    children: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
