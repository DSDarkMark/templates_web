import { FC, ReactElement } from "react"
import { Box, Stack, Grid, Link as MuiLink, Typography, Avatar, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/state";
import Copyright from "./copyright.tsx";
import Banner from "./banner.tsx";
import Categorylink from "./categorylink.tsx";

interface IData {
  data: {
    name: string;
    login: string;
    avatar_url: string;
  }
}

const FooterLogo: FC<IData> = ({ data }) => {
  const { name, login, avatar_url } = data;
  return (
    <Container>
      <Grid container direction="row">
        <Grid item md={6} >
          <Stack spacing={1} p={2}>
            <Avatar srcSet={avatar_url} sx={{ height: "80px", width: "80px" }} />
            <Typography>
              {name} ({login})
            </Typography>
            <Typography variant="subtitle1">
              {` Copyright ${new Date().getFullYear()} by ${login}. All Rights Reserved.`}
            </Typography>
            <Typography variant="subtitle1" >
              <MuiLink color="text.primary">
                Terms
              </MuiLink>
              <MuiLink ml={2} color="text.primary">
                Privacy
              </MuiLink>
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Categorylink />
        </Grid>
      </Grid >
    </Container>
  )
}

const Footer: FC = (): ReactElement => {
  const { userInfo: { name, bio, login, avatar_url }, isLoading } = useSelector((state: RootState) => state.repo);
  return (
    <Box>
      <Banner data={{ bio, isLoading }} />
      <FooterLogo data={{ name, login, avatar_url }} />
      <Copyright />
    </Box >
  );
};

export default Footer;
