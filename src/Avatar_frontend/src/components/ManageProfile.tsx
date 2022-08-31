import React from 'react'
import { Profile } from '../../../declarations/Avatar_backend/Avatar_backend.did';
import styled from 'styled-components';
import { Heading, Grid } from "@adobe/react-spectrum";

const DetailsList = styled.dl`
  dd {
    margin-left: 0;
  }
`;
interface Props {
  profile: Profile;
  setProfile: React.Dispatch<Profile>;

}
function ManageProfile(props: Props) {
  const { profile, setProfile } = props;

  return (
    <section>
        <Heading level={2}>
          Welcome back, {profile.bio.displayName ?? profile.bio.givenName}
        </Heading>
        <DetailsList>
          <Grid columns="1fr 1fr" gap="1rem">
             <dd>Name:</dd>
              <dt>{profile.bio.name}</dt>
              <dd>Display Name:</dd>
              <dt>{profile.bio.displayName}</dt>
              <dd>First Name:</dd>
              <dt>{profile.bio.givenName}</dt>
              <dd>Last Name:</dd>
              <dt>{profile.bio.familyName}</dt>
              <dd>location:</dd>
              <dt>{profile.bio.location}</dt>
              <dd>About:</dd>
              <dt>{profile.bio.about}</dt>
          </Grid>
        </DetailsList>
    </section>
  )
}

export default ManageProfile