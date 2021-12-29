import styles from './DateText.module.scss';
import moment from 'moment';

const DateText = (props: { datetime: Date }) => (
    <span>{moment(props.datetime).calendar()}</span>
)

export default DateText;