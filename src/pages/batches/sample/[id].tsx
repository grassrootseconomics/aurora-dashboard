import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  TextareaAutosize,
  InputAdornment,
} from '@material-ui/core';
import { countryList } from '@/util/constants/countries';
import { useTranslation } from 'react-i18next';
import { BackButton } from '@/components/core/buttons/BackButton';
import { EmailSample } from '@/util/models/EmailSample';
import { sendSampleEmail } from '@/services/batch';
import { useRouter } from 'next/router';

const SampleForm: FC = () => {
    const { t } = useTranslation('translation');
    const router = useRouter();
    const { id }  = router.query;
    const [formData, setFormData] = useState<EmailSample>({
        country: '',
        city: '',
        name: '',
        contactNumber: '',
        email: '',
        message: ''
    });

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData)
        // Perform form submission logic here
        sendSampleEmail(id as string, formData);
    };

    const handleInputChange = (event: ChangeEvent<any>, ) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handlePhoneNumberChange = (number: string) => {
        setFormData((prevData) => ({
        ...prevData,
        contactNumber: number,
        }));
    };

    const countries = countryList.map(c => c.name);

    return (<>
        <div className="sample__banner">
            <BackButton />
            {t('sample.title')}
        </div>
        <form onSubmit={handleFormSubmit}>
        <Grid className="sample__container" container spacing={0}>
            <Grid item sm={6}>
            <FormControl fullWidth>
                {
                    formData.country == '' ?
                        <div className="sample__label">{t('sample.country')}</div> : ""
                }
                <Select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required>
                    {countries.map((country) => (
                        <MenuItem key={country} value={country}>{country}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                name="city"
                fullWidth
                value={formData.city}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">{t('sample.city')}</InputAdornment>
                    ),
                }}
                required
            />
            </Grid>
            <Grid item sm={6}>
            <TextField
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
                required
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{t('sample.name')}</InputAdornment>
                ),
                }}
            />
            <FormControl>
            <PhoneInput
                enableSearch={true}
                value={formData.contactNumber}
                onChange={handlePhoneNumberChange}
                inputProps={{
                    name: 'phone',
                    required: true,
                   }}
                />
            </FormControl>
            </Grid>
            <Grid item xs={12}>
                    <TextareaAutosize
                        name="message"
                        minRows={5}
                        placeholder={t('sample.message') ?? ''}
                        value={formData.message}
                        onChange={handleInputChange}
                        required 
                    />
            </Grid>
            <Grid className="sample__row">
                <TextField
                    name="email"
                    fullWidth
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">{t('sample.email')}</InputAdornment>
                    ),
                    }}
                />
                <button className="sample__button" type="submit">
                    {t('sample.send')}
                </button>
            </Grid>
        </Grid>
        </form>
    </>);
};

export default SampleForm;