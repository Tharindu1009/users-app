import { Drafts,LocationOn,Phone } from '@mui/icons-material';
import './ContactCard.scss';

function ContactCard({ text,icon }) {

    return (
        <div className='contact-card'>
            <div className='icon-wrapper'>
                {icon == "email" && <Drafts className="icon" color="primary" fontSize="small"/>}
                {icon == "address" && <LocationOn className="icon" color="primary" fontSize="small"/>}
                {icon == "phone" && <Phone className="icon" color="primary" fontSize="small"/>}
            </div>
            <label className='text'>{text}</label>
        </div>
    );
}

export default ContactCard;