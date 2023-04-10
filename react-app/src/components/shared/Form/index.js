import StyledForm from './styles.css';
import { StyledTitle, StyledError } from '../../styles.css';
import InputContainer from '../Input';
import SelectContainer from '../Select';
import Button from '../Button';

const Form = ({ selectsInfo, inputsInfo, buttonsInfo, title, error }) => {
    return (
        <StyledForm>
            <StyledTitle>{title}</StyledTitle>
            {error ? <StyledError>{error}</StyledError> : null}
            {inputsInfo.map((input) => (
                <InputContainer
                    key={input.id}
                    type={input.type}
                    value={input.value}
                    id={input.id}
                    label={input.label}
                    placeholder={input.placeholder}
                    width={input.width}
                    height={input.height}
                    onChange={input.onChange}
                />
            ))}
            {selectsInfo
                ? selectsInfo.map((select) => (
                      <SelectContainer
                          key={select.id}
                          id={select.id}
                          defaultValue={select.defaultValue}
                          label={select.label}
                          width={select.width}
                          height={select.height}
                          options={select.options}
                          onChange={select.onChange}
                      />
                  ))
                : null}
            {buttonsInfo.map((b) => (
                <Button key={b.text} text={b.text} type={b.type} handleClick={b.handleClick} active={b.active} />
            ))}
        </StyledForm>
    );
};

export default Form;
