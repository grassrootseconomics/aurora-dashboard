import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const BackButton = () => {

    return (
        <div className="button__back" onClick={() => {history.back()}}>
            <ArrowBackIcon/>
        </div>
    )
}