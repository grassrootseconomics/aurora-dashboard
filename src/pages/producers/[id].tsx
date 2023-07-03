import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';


import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Select } from '@mui/material';

import { BackButton } from '@/components/core/buttons/BackButton';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { getAssociations } from '@/services/association';
import { getDepartments } from '@/services/department';
import { getProducerByCode, updateProducer } from '@/services/producer';
import { Association } from '@/util/models/BasicAssociation';
import { Department } from '@/util/models/BasicDepartment';
import { Producer } from '@/util/models/Producer/Producer';
import { Container, Grid, MenuItem, TextField } from '@material-ui/core';
import Image from 'next/image';

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
  const { userRole } = useUserAuthContext();

  const onSubmit = (data: any) => {
    updateProducer((id as string) ?? '', data);
    setEditMode(false);
  };

  useEffect(() => {
    if (userRole && userRole === 'buyer') {
      router.push('/');
    }
  }, [userRole, router]);

  useEffect(() => {
    if (id) {
      getAssociations().then((assocs) => {
        setAssociations(assocs);
        getDepartments().then((deps) => {
          setDepartments(deps);
          getProducerByCode(id.toString()).then((producer) => {
            setProducer(producer);
            setValue('firstName', producer.firstName);
            setValue('lastName', producer.lastName);
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
          });
        });
      });
    }
  }, [id, setValue]);

  return (
    <>
      <Head>
        <title>Aurora - Producers</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="producer">
        <Container>
          <BackButton />
          <div className="producer__header">
            <h1>{t('producers.title')}</h1>
            <div className="producer__info">
              <button
                className="producer__button"
                onClick={() => router.push(`/producers/activity/${id}`)}
              >
                {t('producers.button')}
              </button>
              <div className="producer__code">
                {t('producers.code')}: {producer?.code}
              </div>
            </div>
          </div>
            { !isLoading ? <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={6}>
                <Grid item sm={12} md={6}>
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
                                            <Image width={24} height={24} alt={t('producers.first_name')} src={"/assets/producer/person.svg"} className="producer__icon" />
                                            {t('producers.first_name')}:
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
                                            <Image width={24} height={24} alt={t('producers.last_name')} src={"/assets/producer/person.svg"} className="producer__icon" />
                                                {t('producers.last_name')}:
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
                                            <Image width={24} height={24} alt={t('producers.phone_number')} src={"/assets/producer/phone.svg"} className="producer__icon" />
                                            {t('producers.phone_number')}:
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
                                    <Image width={24} height={24} alt={t('producers.gender')} src={"/assets/producer/gender.svg"} className="producer__icon" />
                                    {t('producers.gender')}:
                                </div>
                                <Select 
                                    {...field}
                                    disabled={!editMode}
                                    >
                                    <MenuItem value="male">{t('producers.male')}</MenuItem>
                                    <MenuItem value="female">{t('producers.female')}</MenuItem>
                                    <MenuItem value="other">{t('producers.other')}</MenuItem>
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
                                            <Image width={24} height={24} alt={t('producers.year_birth')} src={"/assets/producer/calendar.svg"} className="producer__icon" />
                                            {t('producers.year_birth')}:
                                        </div>
                                    )
                                }}
                                disabled={!editMode}
                                {...field}
                            />
                            )}
                    />   
                    <Grid container>
                        <Grid item className={"producer__map"} xs={3} md={3}>
                            <Image width={124} height={124} alt={"Colombia"} src={"/assets/producer/colombia.svg"} className="producer__icon--colombia" />
                        </Grid>
                        <Grid item xs={9} md={9}>
                            <Controller
                                name="idDepartment"
                                control={control}
                                defaultValue={control._defaultValues.idDepartment}
                                render={({ field }) => (
                                    <div className="producer__row">
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
                                                    {t('producers.municipality')}:
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
                                                    {t('producers.village')}:
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
                    { associations ? 
                        <Controller
                            name="idAssociation"
                            control={control}
                            defaultValue={control._defaultValues.idAssociation}
                            render={({ field }) => (
                                <div className="producer__row">
                                    <div className="producer__icon-label">
                                        <Image width={24} height={24} alt={t('producers.association')} src={"/assets/producer/association.svg"} className="producer__icon" />
                                        {t('producers.association')}:
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
                <Grid item sm={12} md={6}>
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
                                            <Image width={24} height={24} alt={t('producers.farm_name')} src={"/assets/producer/farm.svg"} className="producer__icon" />
                                            {t('producers.farm_name')}:
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
                                            <Image width={24} height={24} alt={t('producers.location')} src={"/assets/producer/location.svg"} className="producer__icon" />
                                            {t('producers.location')}:
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
                                            <Image width={24} height={24} alt={t('producers.no_ha')} src={"/assets/producer/ha.svg"} className="producer__icon" />
                                            {t('producers.no_ha')}:
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
                                            <Image width={24} height={24} alt={t('producers.no_cocoa_ha')} src={"/assets/producer/cocoaHa.svg"} className="producer__icon" />
                                            {t('producers.no_cocoa_ha')}:
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
                                            <Image width={24} height={24} alt={t('producers.no_forest_ha')} src={"/assets/producer/forestHa.svg"} className="producer__icon" />
                                            {t('producers.no_forest_ha')}:
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
                                            <Image width={24} height={24} alt={t('producers.no_cocoa_lots')} src={"/assets/producer/cocoaLots.svg"} className="producer__icon" />
                                            {t('producers.no_cocoa_lots')}:
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
                                            <Image width={24} height={24} alt={t('producers.water_source')} src={"/assets/producer/waterSources.svg"} className="producer__icon" />
                                            {t('producers.water_source')}:
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
                                            <Image width={24} height={24} alt={t('producers.wildlife')} src={"/assets/producer/wildlife.svg"} className="producer__icon" />
                                            {t('producers.wildlife')}:
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
                {editMode ? (
                    <div className="producer-edit">
                    <div
                        onClick={() => {
                        setEditMode(false);
                        }}
                    >
                        <CancelIcon /> {t('buttons.cancel_edit')}
                    </div>
                    <button type="submit">
                        <AddCircleIcon /> {t('buttons.save')}
                    </button>
                    </div>
                ) : (
                    <div className="producer-edit">
                    <div
                        onClick={() => {
                        setEditMode(!editMode);
                        }}
                    >
                        <EditNoteIcon /> {t('buttons.start_edit')}
                    </div>
                    </div>
                )}
                </form>
            : (
            ''
          )}
        </Container>
      </div>
    </>
  );
}
