
import { useGetIdentity, useOne } from '@pankod/refine-core';
import { Profile } from 'components';
import { Box } from '@pankod/refine-mui';

const MyProfile = () => {
    const { data: user } = useGetIdentity();
    const { data, isLoading, isError } = useOne({
        resource: 'users',
        id: user?.userid,
    });

    const myProfile = data?.data || { name: '', email: '', avatar: '', allProperties: [] };

    return (


        <Box>
            <Profile
                type="Moj"
                name={myProfile.name}
                email={myProfile.email}
                avatar={myProfile.avatar}
                properties={myProfile.allProperties}
            />


        </Box>





    );
};

export default MyProfile;
