import React, {FunctionComponent, useContext} from 'react'
import {Divider, Grid, Typography} from '@material-ui/core'
import FooterMenuGroup from './FooterMenuGroup'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {SanityTransformHwHomePage} from "../../../common/sanityIo/Types";
import DigitalResumeTheme, {COLORS, rainbow} from "../../../theme/DigitalResumeTheme";
import PageContext from "../../page-context/PageContext";
import MediaQueriesContext from "../../media-queries-context/MediaQueriesContext";
import MailTo from "../../mail-to/MailTo";
import Logo from "../../transform-hw/logo/Logo";


export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.text.secondary,
    }
}))


interface IProps {
    menuContainerSlug?: string
    homePage: SanityTransformHwHomePage
    updateIsLoading?: (value: boolean) => void
}

const FooterMenuContainer: FunctionComponent<IProps> = (props: IProps) => {
    const classes = useStyles(DigitalResumeTheme)

    const pageContext = useContext(PageContext)
    const mediaQueriesContext = useContext(MediaQueriesContext)


    return (
        <Grid container item className={classes.root} spacing={5}>
            <Grid container item xs={12} md={4} style={mediaQueriesContext.smDown ? {
                borderLeft: `4px solid ${DigitalResumeTheme.palette.primary.main}`,
                backgroundColor: "rgba(117,117,117,.5)",
                borderRight: `4px solid ${DigitalResumeTheme.palette.primary.main}`,
            } : {}}>
                {
                    pageContext.pageFooter?.subMenus?.map((menuGroup: any, index: number) => {
                        return (
                            <Grid key={index} item xs={6}>
                                <FooterMenuGroup menuGroup={menuGroup}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Grid item container xs={12} md={4} justifyContent='center'>
                {pageContext.pageFooter?.logoImageSrc ?
                    <Logo isCenter logoImageSrc={pageContext.pageFooter.logoImageSrc} height={108}/>:<Grid container item justifyContent='center'>
                        <Typography component='div' variant='h2' style={{...rainbow, color: "#383838"}}>James <Typography display='inline' style={{...rainbow,}} variant='h2' color='primary'>Terrell</Typography> Singleton<Typography display='inline' style={{...rainbow,}} variant='h2' color='primary'>.</Typography></Typography>
                    </Grid>}
                <Grid item container justifyContent='center' style={{
                    paddingBottom: "16px",
                    marginTop: "12px",
                }}>

                    <Grid item>
                        <Divider style={{
                            width: "70px",
                            backgroundColor: "white"
                        }}/>
                    </Grid>

                </Grid>
                <Grid item container>
                    <Grid container item spacing={1} justifyContent='center'>
                        <Grid item>
                            <Typography color='inherit' style={{width: "180px"}} align='center' variant='subtitle1'
                                        gutterBottom>{props.homePage.address}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={1} justifyContent='center'>
                        <Grid item>
                            <Typography color='inherit' align='center'
                                        variant='subtitle1'>{props.homePage.phone}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={1} justifyContent='center'>
                        {<Grid item>
                            <MailTo color={"#383838"} email={props.homePage.email??""} subject={"Information Request"} body={""}><Typography color='inherit'>{props.homePage.email}</Typography></MailTo>
                        </Grid>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} md={4} alignContent='flex-start' spacing={2}>

            </Grid>
        </Grid>
    )
}

export default FooterMenuContainer