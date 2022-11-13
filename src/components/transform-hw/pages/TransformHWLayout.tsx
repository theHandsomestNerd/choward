import {CssBaseline, Grid, Link, makeStyles, MuiThemeProvider, Theme} from '@material-ui/core'
import React, {FunctionComponent, useState} from 'react'
import BlockContentLayoutContainer from '../../BlockContentLayoutContainer'
import cmsClient from '../../block-content-ui/cmsClient'
import TransformHWTheme from "../../../theme/transform-hw/TransformHWTheme";
import transformHWTheme from "../../../theme/transform-hw/TransformHWTheme";
import UnderConstruction from "./under-construction-page/UnderConstruction";
import {SanityTransformHwHomePage} from "../../../common/sanityIo/Types";
import FourOhFour from "./error-page/FourOhFour";
import {useScrollPosition} from "../../../utils/useScrollPosition";
import LoadingPage from "./loading-page/LoadingPage";
import PsychologyTodaySeal from "../psychology-today-stamp/PsychologyToday";
import thwClient from "../thwClient";


export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100vw',
        // backgroundColor: "whitesmoke"
    }
}))

export type AppLayoutProps = {}

const TransformHWLayout: FunctionComponent<AppLayoutProps> = (props) => {
    const classes = useStyles(TransformHWTheme)
    const [homePage, setHomePage] = React.useState<SanityTransformHwHomePage | undefined>()
    const [realizedContent, setRealizedContent] = React.useState<any[]>([])

    const {isLoading, isError, data, isRefetching} = thwClient.useFetchPageBySlugQuery()

    React.useEffect(() => {
        console.log("homepage data",data)
        if (data)
            setHomePage(data[0])
    }, [data])

    React.useEffect(() => {
        // These Content sections are references and must be retrieved from Sanity
        homePage?.pageContent?.content?.map && Promise.all(homePage?.pageContent?.content?.map((contentBlock: any) => {
            return cmsClient.fetchRef(contentBlock).then((response) => {
                return response
            })
        })).then(contentRealized => {
            setRealizedContent(contentRealized)
        })
    }, [homePage])

    const [hideOnScroll, setHideOnScroll] = useState(true)

    useScrollPosition(({prevPos, currPos}: any) => {
        const isShow = currPos.y > -100
        if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    }, [hideOnScroll])

    const PageLayout = () => {
        return <Grid container direction='column' className={classes.root}>
            <Grid container item>
                <BlockContentLayoutContainer
                    isOpaque={hideOnScroll}
                    homePage={homePage}
                    content={realizedContent}/>
            </Grid>
            <Grid container item
                  alignContent='center'
                  alignItems='stretch'
                  style={{
                      backgroundColor: "white",
                      position: "static",
                      bottom: 0,
                      padding: transformHWTheme.spacing(1)
                  }}
                  justifyContent='space-between'>
                <Grid item xs={8} container alignContent='center' style={{paddingTop: transformHWTheme.spacing(.75)}}>
                    <Link href='https://thehandsomestnerd.com' color='textPrimary' variant='subtitle2'>© 2022
                        TheHandsomestNerd, LLC.</Link>
                </Grid>
                <Grid item justifyContent='flex-end' xs={4} container alignContent='center'>
                    <PsychologyTodaySeal/>
                </Grid>
            </Grid>
        </Grid>
    }


    const PageContents = () => {
        if (isLoading || (realizedContent.length < homePage?.pageContent?.content?.length && !homePage?.underConstructionPageRef) || isRefetching)
            return <LoadingPage/>

        if (!homePage?.isUnderConstruction) {
            return <PageLayout></PageLayout>
        } else if (homePage.underConstructionPageRef) {
            return <UnderConstruction underConstructionPageRef={homePage.underConstructionPageRef}
                                      email={homePage?.email}/>
        }

        if (isError) {
            return <FourOhFour/>
        }

        return <FourOhFour/>
    }

    return (<MuiThemeProvider theme={TransformHWTheme}>
        <CssBaseline/>
        {/*<MetaTagsComponent structuredData={homePage?.structuredData && homePage.structuredData[0]}*/}
        {/*                   title={homePage?.title ?? ''}*/}
        {/*                   description={homePage?.description ?? ''} imgSrc={homePage?.metaImage}/>*/}
        <PageContents/>
    </MuiThemeProvider>)
}

export default TransformHWLayout