import React, { FC, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import InputMask from 'react-input-mask';
import CustomInput, { StyledLabel } from '../components/common/Input';
import CustomButton from '../components/common/Button';
import './style.scss';

const user = {
  id: 1,
  name: 'Leanne Graham',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
  },
  phone: '1-770-736-8031 x56442',
};

interface IFormData {
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}

const Profile: FC = () => {
  const [formData, setFormData] = useState<IFormData>(user);
  const [dataChanged, setDataChanged] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setDataChanged(true);
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
    setDataChanged(true);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {user ? (
        <>
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            spacing={{ md: '30px', lg: '50px' }}
            justifyContent='flex-start'
          >
            <Stack className='menu-container' direction={{ sm: 'column' }}>
              <Box className='headings-container'>
                <Typography variant='h2' sx={{ mb: '15px' }}>
                  {formData.name}
                </Typography>
                <Typography className='page-with-menu__subheding'>
                  Personal profile
                </Typography>
              </Box>
            </Stack>

            <Stack direction='column' spacing='32px' className='form-container'>
              <form className='form'>
                <CustomInput
                  id='name'
                  name='name'
                  labelText='First name'
                  onChange={handleInputChange}
                  value={formData.name}
                  className='form__input'
                />
                <CustomInput
                  id='email'
                  name='email'
                  labelText='Email'
                  onChange={handleInputChange}
                  value={formData.email}
                  className='form__input'
                />
                <StyledLabel htmlFor='phone'>Mobile phone number</StyledLabel>
                <InputMask
                  id='phone'
                  name='phone'
                  placeholder='(000) 000-0000'
                  mask='(999) 999-9999'
                  value={formData.phone}
                  className='masked-input form__input'
                  onChange={handleInputChange}
                />
                <Typography variant='h6' component='p'>
                  Address
                </Typography>
                <CustomInput
                  id='street'
                  name='street'
                  labelText='Street'
                  onChange={handleAddressInputChange}
                  value={formData.address.street}
                  className='form__input'
                />
                <CustomInput
                  id='suite'
                  name='suitw'
                  labelText='Suite'
                  onChange={handleAddressInputChange}
                  value={formData.address.suite}
                  className='form__input'
                />
                <CustomInput
                  id='city'
                  name='city'
                  labelText='City'
                  onChange={handleAddressInputChange}
                  value={formData.address.city}
                  className='form__input'
                />
                <CustomInput
                  id='zipcode'
                  name='zipcode'
                  labelText='Zip-code'
                  onChange={handleAddressInputChange}
                  value={formData.address.zipcode}
                  className='form__input'
                />

                <CustomButton
                  id='contact'
                  onClick={handleSubmit}
                  variant='contained'
                  disabled={!dataChanged}
                  className='form__btn'
                >
                  Save
                </CustomButton>
              </form>
            </Stack>
          </Stack>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Profile;
