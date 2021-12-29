import styles from './Checkbox.module.scss';

const Checkbox = (props: {
    label: string,
    isChecked: boolean,
    onClick: Function
}) => (
    <div className={styles.checkbox}>
        <div className="pretty p-switch p-fill">
            <input 
              type="checkbox" 
              checked={props.isChecked} 
              onClick={(arg) => props.onClick()}
            />
            <div className="state">
                <label>{props.label}</label>
            </div>
        </div>
    </div>
)

export default Checkbox;