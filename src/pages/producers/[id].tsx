
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Container, Grid, TextField, MenuItem } from '@material-ui/core';
import { AccountCircle, Phone, Wc, Cake, Business, LocationOn, Landscape, Domain, LocalDrink, Pets} from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { BackButton } from '@/components/core/buttons/BackButton';
import ForestIcon from '@mui/icons-material/Forest';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AppsIcon from '@mui/icons-material/Apps';
import { Producer } from '@/util/models/Producer/Producer';
import { getProducerByCode, updateProducer } from '@/services/producer';
import { Select } from '@mui/material';
import { Association } from '@/util/models/BasicAssociation';
import { Department } from '@/util/models/BasicDepartment';
import { getAssociations } from '@/services/association';
import { getDepartments } from '@/services/department';

export default function Producers() {
    const { t } = useTranslation('translation');
    const { handleSubmit, control, setValue } = useForm<any>();
    const router = useRouter();
    const { id } = router.query;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [producer, setProducer] = useState<Producer>();
    const [associations, setAssociations] = useState<Association[]>();
    const [departments, setDepartments] = useState<Department[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onSubmit = (data: any) => {
        updateProducer(id as string ?? "", data)
        setEditMode(false);
    };

    useEffect(() => {
        if(id) {
            getAssociations().then(assocs => {
                    setAssociations(assocs);
                    getDepartments().then(deps => {
                        setDepartments(deps);
                        getProducerByCode(+(id as string)).then(producer => {
                            setProducer(producer);
                            setValue('firstName', producer.firstName)
                            setValue('lastName', producer.lastName)
                            setValue('phoneNumber', producer.phoneNumber ?? '');
                            setValue('gender', producer.gender);
                            setValue('birthYear', producer.birthYear);
                            setValue('idDepartment', producer.idDepartment);
                            setValue('municipiality', producer.municipiality ?? '');
                            setValue('village', producer.village ?? '');
                            setValue('idAssociation', producer.idAssociation);
                            setValue('farmName', producer.farmName ?? '');
                            setValue('location', producer.location ?? '');
                            setValue('nrOfHa', producer.nrOfHa ?? 0);
                            setValue('nrCocoaHa', producer.nrCocoaHa ?? 0);
                            setValue('nrForestHa', producer.nrForestHa ?? 0);
                            setValue('nrCocoaLots', producer.nrCocoaLots ?? 0);
                            setValue('nrWaterSources', producer.nrWaterSources ?? '');
                            setValue('wildlife', producer.wildlife ?? '');
                            setIsLoading(false);
                        })
                    });
                }
            );
        }

    }, [id])

    return (
        <>
            <Head>
                <title>Aurora - Producers</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
            <div className="producer">
                <Container>
                    <BackButton/>
                    <div className="producer__header">
                        <h1>Producer</h1>
                        <div className="producer__info">
                            <button className="producer__button" onClick={() => router.push(`/producers/activity/${id}`)}>
                                {t('producers.button')}
                            </button>
                            <div className="producer__code">
                                {t('producers.code')}: {producer?.code}
                            </div>
                        </div>
                    </div>
                    { !isLoading ? <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="firstName"
                            defaultValue={control._defaultValues.firstName}
                            render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <AccountCircle className="producer__icon" />
                                                    First Name:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />     
                                )}
                            />    
                            <Controller
                                control={control}
                                name="lastName"
                                defaultValue={control._defaultValues.lastName}
                                render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            InputProps={{
                                                startAdornment: (
                                                    <div className="producer__icon-label">
                                                        <AccountCircle className="producer__icon" />
                                                        Last Name:
                                                    </div>
                                                )
                                            }}
                                            disabled={!editMode}
                                            {...field}
                                        />     
                                    )}
                                />  
                            <Controller
                                control={control}
                                name="phoneNumber"
                                defaultValue={control._defaultValues.phoneNumber}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <Phone className="producer__icon" />
                                                    Phone Number:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />   
                                    )}
                            />         
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue={control._defaultValues.gender}
                                render={({ field }) => (
                                    <div className="producer__row">
                                        <div className="producer__icon-label">
                                            <Wc className="producer__icon" />
                                            Gender:
                                        </div>
                                        <Select 
                                            {...field}
                                            disabled={!editMode}
                                            >
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
                                        </Select>
                                    </div>
                                )}
                                />
                            <Controller
                                control={control}
                                name="birthYear"
                                defaultValue={control._defaultValues.birthYear}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        type="text"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <Cake className="producer__icon" />
                                                    Year of Birth:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />
                                    )}
                            />   
                                <Controller
                                    name="idDepartment"
                                    control={control}
                                    defaultValue={control._defaultValues.idDepartment}
                                    render={({ field }) => (
                                        <div className="producer__row">
                                            <div className="producer__icon-label">
                                                <Business className="producer__icon" />
                                                Department:
                                            </div>
                                            <Select 
                                                {...field}
                                                disabled={!editMode}
                                                >
                                                {departments?.map(d => {
                                                    return <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                                                })
                                                }
                                            </Select>
                                        </div>
                                    )}
                                /> 
                            <Controller
                                control={control}
                                name="municipiality"
                                defaultValue={control._defaultValues.municipiality}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Municipality"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <LocationOn className="producer__icon" />
                                                    Municipality:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />
                                )}
                            />  
                            <Controller
                                control={control}
                                name="village"
                                defaultValue={control._defaultValues.village}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Village"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <LocationOn className="producer__icon" />
                                                    Village:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />
                                )}
                            /> 
                            { associations ? 
                                <Controller
                                    name="idAssociation"
                                    control={control}
                                    defaultValue={control._defaultValues.idAssociation}
                                    render={({ field }) => (
                                        <div className="producer__row">
                                            <div className="producer__icon-label">
                                                <Domain className="producer__icon" />
                                                Association:
                                            </div>
                                            <Select 
                                                {...field}
                                                disabled={!editMode}
                                                >
                                                {associations.map(a => {
                                                    return <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                                                })
                                                }
                                            </Select>
                                        </div>
                                    )}
                                /> : ""
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name="farmName"
                                defaultValue={control._defaultValues.farmName}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Farm Name"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <AgricultureIcon className="producer__icon" />
                                                    Farm Name:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field} 
                                    />
                                )}
                            /> 
                            <Controller
                                control={control}
                                name="location"
                                defaultValue={control._defaultValues.location}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <LocationOn className="producer__icon" />
                                                    Location:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field} 
                                    />
                                )}
                            /> 
                            <Controller
                                control={control}
                                name="nrOfHa"
                                defaultValue={control._defaultValues.nrOfHa}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Number of Ha"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <Landscape className="producer__icon" />
                                                    # of Ha:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field} 
                                    />
                                )}
                            /> 
                            <Controller
                                control={control}
                                name="nrCocoaHa"
                                defaultValue={control._defaultValues.nrCocoaHa}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Number of Cocoa Ha"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <Landscape className="producer__icon" />
                                                    # of Cocoa Ha:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    /> 
                                )}
                            /> 
                            <Controller
                                control={control}
                                name="nrForestHa"
                                defaultValue={control._defaultValues.nrForestHa}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Number of Forest Ha"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <ForestIcon className="producer__icon" />
                                                    # of Forest Ha:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />
                                )}
                            /> 
                            <Controller
                                control={control}
                                name="nrCocoaLots"
                                defaultValue={control._defaultValues.nrCocoaLots}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Number of Cocoa Lots"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <AppsIcon className="producer__icon" />
                                                    # of Cocoa Lots:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />
                                )}
                            /> 
                            <Controller
                                control={control}
                                name="nrWaterSources"
                                defaultValue={control._defaultValues.nrWaterSources}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Water Sources"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <LocalDrink className="producer__icon" />
                                                    Water Sources:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />
                                )}
                            /> 
                            <Controller
                                control={control}
                                name="wildlife"
                                defaultValue={control._defaultValues.wildlife}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Wildlife"
                                        InputProps={{
                                            startAdornment: (
                                                <div className="producer__icon-label">
                                                    <Pets className="producer__icon" />
                                                    Wildlife:
                                                </div>
                                            )
                                        }}
                                        disabled={!editMode}
                                        {...field}
                                    />
                                )}
                            /> 
                        </Grid>
                        </Grid>
                        { editMode ? 
                            <div className="producer-edit">
                                <div onClick={() => {setEditMode(false)}}>
                                    <CancelIcon /> Cancel Edit
                                </div>
                                <button type="submit"><AddCircleIcon /> Save</button>
        
                            </div> :
                            <div className="producer-edit">
                                <div onClick={() => {setEditMode(!editMode)}}>
                                    <EditNoteIcon /> Start Edit
                                </div>
                            </div>
                        }
                    </form> : ""}
                </Container>
            </div> 
        </>
    );
}