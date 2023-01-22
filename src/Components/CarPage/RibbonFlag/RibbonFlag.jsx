import './ribbonFlag.scss';

const RibbonFlag = (props) => {
    const {label} = props
    return(
        <div className="ribbon ribbon-top-left">
            <span>{label ? label : 'Featured'}</span>

        </div>
        
    );
}
export default RibbonFlag;