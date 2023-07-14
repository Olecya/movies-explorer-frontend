import './InfoTooltip.css';
import chernV from '../../images/chernV.svg';
import krasnX from '../../images/krasnX.svg';

const InfoTooltip = ({ isOpen, onClose, isOk }) => {

    return (
        <section className={`InfoTooltip ${isOpen && "InfoTooltip_opened"}`}>
            {/* <section className={`InfoTooltip ${true && "InfoTooltip_opened"}`}> */}
            <div className="InfoTooltip__form InfoTooltip__form-sign">
                <button className="InfoTooltip__close" type="button" aria-label="close popup" onClick={onClose} ></button>
                <div className="InfoTooltip__sign">
                    <img className="InfoTooltip__sign-image" src={isOk ? chernV : krasnX} alt={isOk ? "черная галочка" : "красный крест"} />
                </div>
                <h2 className="InfoTooltip__sign-subtitle">
                    {isOk ? `Профиль успешно отредактирован!` : `Что-то пошло не так! Попробуйте еще раз.`}
                </h2>
            </div>
        </section>
    )
}

export default InfoTooltip;