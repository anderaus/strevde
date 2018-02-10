import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters: {
    activities_count: state => state.trip.activities ? state.trip.activities.length : 0,
    total_moving_time: state => {
      if (!state.trip.activities) return 0
      return state.trip.activities.reduce(function (total, item) {
        return total + item.moving_time
      }, 0)
    },
    total_distance: state => {
      if (!state.trip.activities) return 0
      return state.trip.activities.reduce(function (total, item) {
        return total + item.distance
      }, 0)
    },
    total_elevation: state => {
      if (!state.trip.activities) return 0
      return state.trip.activities.reduce(function (total, item) {
        return total + item.total_elevation_gain
      }, 0)
    },
    longest_moving_time: state => {
      if (!state.trip.activities) return 0
      return Math.max.apply(Math, state.trip.activities.map(function (item) { return item.moving_time }))
    },
    longest_distance: state => {
      if (!state.trip.activities) return 0
      return Math.max.apply(Math, state.trip.activities.map(function (item) { return item.distance }))
    },
    highest_elevation: state => {
      if (!state.trip.activities) return 0
      return Math.max.apply(Math, state.trip.activities.map(function (item) { return item.total_elevation_gain }))
    },
    photos: state => {
      if (!state.trip.activities) return []
      return state.trip.activities.reduce(function (previous, current, currentIndex, calledupon) {
        return previous.concat(current.photos || [])
      }, [])
    },
    polylines: state => {
      if (!state.trip.activities) return []
      return state.trip.activities.reduce(function (previous, current, currentIndex, calledupon) {
        return previous.concat(current.polyline || [])
      }, [])
    }
  },
  state: {
    trip: {
      'mapType': 'satellite',
      'title': 'Tour du Mont Blanc',
      'subtitle': 'Anders & Hilde - July 2016',
      'activities': [
        {
          'id': 629802439,
          'title': 'Balcony Route from Chamonix to Argentiére + detour',
          'polyline': 'qahwGsk|h@}@}@a@[qAkBa@YY]Q[i@i@]M_@PIFCPF\\A|@Mn@IbAAd@Dr@Kj@a@CWe@][_APIVe@?kBo@c@Kg@EYAM@c@XOIa@GOLq@IGEc@K_@c@_@YYWqAo@q@i@Kk@Dq@^wBQYQ?cA[@c@Nk@b@_ATu@DXAPKBKC_@[[e@o@k@q@c@{@_@c@?w@c@e@GV[Eq@c@Oc@Ei@WaAq@KO[SWg@[Ya@R[Fa@O_@c@gAu@EK]_@SYOe@QWMYSMi@o@s@cAeAmAk@a@y@}@a@i@QM[CKCs@[c@Mk@e@_@Mc@c@EKOI_@WUU]OOAa@U]_@_@Uk@e@[KKG]]}@i@c@]g@Ya@]_@Oa@_@e@Q]UMSa@a@Y_@KESQY]Yg@[c@Wg@]wA?WGLOt@U_@O_@AK_@sAUm@MS[oASk@OOKOKYCQU[cA_CQYOo@S[k@_@]g@IGCc@Zc@\\_@`@SN?BBGDmuBsFOd@BRMm@S_@BI_ADc@Lc@R[Z]f@]^_@T_AXu@^IJ]Na@La@A[C_@Q_@FKIeAOo@t@[Ow@s@Oo@UEJK}@S_@U[cBSi@Wc@CO?DBMGDBD@MQVc@NaAh@]Za@BUa@Ud@cBo@a@I_@Qc@Ga@P[X_A[a@Ja@Ia@O[W]Ga@AYa@[YWg@Qm@Ds@Eo@HgBQ[c@Ku@eA}@y@Yc@a@Q]]U[Ua@AOe@{@OMWi@Qg@DOKo@_@WcAe@y@y@YIU_@aBw@w@}@Hp@YKGXOKQA[H_@QGg@KDa@M_@J]\\]P]FQ`@MHGKMBFAGGDFKPBOAKa@S_@CWY_@C]NW@Q\\[Na@F_AI?Xa@T]]_@FUNSK?n@_@Ua@DIRE\\LX[RWb@y@p@a@DYIc@@_@DYJc@C@c@STEAWRSh@In@GLOY[SYKD?k@Hc@L_@Am@Yq@mA[aAG]KvAMAg@lAOH?JFDE?GFUf@Gn@Ln@BAKx@K\\GQX]Ce@Oq@LiA^S?e@l@iARM^_BNOUWZ[@SNG]_@Oc@c@_@[Po@e@IUO_AAWJc@@k@QuACsADEVg@RIEc@NAFGFi@Hc@@q@N?Cq@R]q@eDu@gAoAi@_@Sm@aBA_ADq@Oo@Ac@BK^QLYHm@EKHq@?YWeAKUBKCs@BEAo@Hs@Au@G_@K_BGq@[e@Sk@I]MSSo@E]?GDEFo@VK[aADgACi@Y{@Ie@m@}@YY_@Y[Yu@_AQADb@@n@Ap@In@[Vc@G_@Y]XOn@Gp@D^KELcBZa@^U\\K\\YPe@Hm@IcBDe@YWiACa@K[a@Qk@e@a@]_@g@UYa@Eq@ZB[Aa@WUe@Om@Ye@k@qA}@s@]OOMa@i@OMOCUMII?E]e@EIYMi@M[SIQg@i@QMc@KGGOY_@YBo@YWBHAVLj@G\\[Lc@O]VSh@]^]X[`@Wf@]A_@]a@QgAKc@L]OWg@KKoB?_@D_@]eAB]E]KIPS@e@QYAQi@IM]AY_@WOa@CWIAO[i@e@WSh@]Ha@O_@Wc@KsA_AUYAHcAHa@Og@e@K_@m@c@E?IKSI]NcAUCMFOGi@[K?a@[M_@?c@FQKI_@BMUAq@_@KAOQUO[Za@Mu@@a@I{@k@SYc@BDSR_@BAa@Ic@H?GFOZc@dAF`AU?MEc@`@GBMr@YP[SmAYK]AKG?WK?EWOH?Gc@G]SWIf@a@QM[IOSqAJNc@?GCFASUA@G]IACC@[CUQi@NGIGWDc@KEP[c@@CBRa@XWc@OQD@STk@l@m@AG_@MXOOO[GDO\\[P?IGMCc@C?CBMZ]b@KP?EKQEK?FMzA[J?LGf@i@Xc@hCk@Z_@d@GF@dAw@@i@Ju@Do@C@B?C?BBC?LU\\]^Y`@SVc@Ge@_@SMQCWt@kA`@Up@sALEDKV[BMRm@Vi@DQZYVi@Ze@^]fA_@^_@Pi@P[b@Wb@C`Au@\\Gx@e@d@A`@Tb@Fb@MRAb@PdBbAb@Fd@AJEj@E`@NP?p@SJQFY`@S|@aAJDJORG\\a@JQ^Wf@e@@TADt@cANf@\\gATi@@]J@DFZJPE^@f@F\\R^F`@Pb@LN@b@GCa@t@P`@[l@Y|@D~@u@TGNCf@?\\I`@Sd@Qd@?`@FhAFd@F`@JhABbB|@JXPRhAU^SH@Zd@Df@CX?VA|@PhCCTBhAPp@AB',
          'distance': 16332.9,
          'moving_time': 16222,
          'elapsed_time': 25724,
          'total_elevation_gain': 1414.5,
          'photos': [
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/ypNbaH_S11CzXr6HyI9jat-6u9o0vdPVv2KvWXhp3ac-512x384.jpg'
            }
          ]
        },
        {
          'id': 631249464,
          'title': "Argentiére to Forclaz (variante d'Arpette)",
          'polyline': '{gtwGcahi@E\\Ho@?eDDgAAk@Wa@a@Pe@b@a@Li@k@S[YKKAKIc@Mc@Fe@?c@Ie@Cc@?k@KiAA]ByAh@_@JK?iAr@o@NKA]JI?OEO?WDILETc@EiA?c@Sa@Ma@We@Aa@He@AWO]|AKPBDNGEESZMJSi@o@`AE[e@Z}@z@qA`ASEYb@Yl@Wd@c@j@SGGGg@@g@Ae@Me@Gg@u@YMuAEa@FUKM[K?g@@aBv@g@\\E?MNOAs@\\c@ZEHJ]BHDUKp@Yd@]Zy@V]TMNk@b@QX[`@}@|Bm@rASn@I@AK_@u@?QR{CMi@Bk@DGCg@KYWMKc@i@sAKk@u@}@Gu@Oi@Wg@Ok@Nu@Aq@Pa@Ei@GXY\\[OLu@Bq@[B_@VOEWb@WMCo@GEo@kAIcAG]QC[VK@m@YE_@g@HYe@?IWWaAq@s@_Aa@Ca@@_@[c@K[_@_@UeBa@Ya@uA}@OVa@SYc@{@_AGOOEq@u@FACJAG@l@Fp@Ll@Dl@_@KGHNl@EJB\\ZdBFn@Vd@Jl@Fp@]IGY]]Kd@Kp@[LUWo@j@]OKQw@SWMI[W_@O_@?o@Si@]Qc@Ca@Qw@_AOi@[COU?EOe@U_@WOWa@]Y[[We@[_@KU_@M]W_@O_@Uu@}@_@[_@GEGa@Qq@Ia@S][s@y@@KUS_@G][aA_@CK_@Wi@m@MEq@iAGC}@u@eAOIO{@w@[]_@KSB}@_@{@y@aAm@[u@a@?_@O]Uc@K[Qa@Ge@B]Wo@WSWa@SaAI_@OY[U?a@FNu@IIYIc@CG@WAE@NIEQXe@^Y@KBg@GiAUe@q@[I?[WUK]?WUQIF@DOZJYG[Ba@SkAmAGOC_@e@WWYA]DKMKCG_@Q[[YMGKOEMMQIEMWe@a@OW]IASQ_@IGO?Cy@y@c@EQIm@q@eAg@m@OGQ}@g@Ak@?k@j@}@VS_@Ue@KYa@Xg@x@{@RKy@m@IMEq@O[Qk@h@gA?[[gAYc@eAqBY}AWe@Ma@S_AUm@AM@i@RYAgBRc@Li@Ce@Ik@k@?a@WW[Q]c@F]A?G^m@^Wb@wAj@sAPk@a@GgAEkCUa@Sk@_Aa@ECFq@`@ACADBCQBSCa@Oc@@IBH[Gm@Sk@Ue@]_@_Am@Lw@Vc@@u@^]D_@IIa@Oc@KoCUc@Kc@Bc@NKJ_@TYh@CACS@s@D[\\w@Pm@Lq@i@iAc@gAKc@Em@F[Q_@`@Y`AmAf@u@Fs@QqABgABM?{@Fq@N}@Bq@Lo@?QZaBAq@Bs@Eu@Gs@BgBIs@][C]LQJA`@WLo@Pk@Vi@?EJFKITy@Z}Cb@{CPo@Ve@^k@\\_@OcA@u@D[DK`@D^ZFH`@XTFMDnA??UBDNSXHZZUQSWEABi@Eu@@u@PsBEuB@gCEsA?s@Cu@Iq@_@s@Fm@Jo@CkAESD?BCSqAQaBNWMGIYS_AIOI[Qi@CSHKISGe@]}AQm@U_@Y{@Ug@Sk@Mm@Qm@JKGEEQ[Y]e@EgAV{AJeBBqBIq@@k@WsCIq@Sg@UYe@wBKm@Ug@QYIGGMSuAWg@E[GBKk@Y{@[a@][Wi@Sm@a@w@ECq@gCq@m@w@eAWSYa@EKBo@Am@K_@WyAUe@UoADo@Eq@Qg@O{@@_@GWCi@DCOODc@b@GHDf@Bd@CZIHGR]Z]d@c@Vy@h@s@P}@?QZ{Br@uBDq@P]AQNw@^N`@DTAJIlAa@Hs@Ak@d@uAJOLi@@MTg@X[p@aAJq@@?PUJaBLo@LIFq@HOH_@Fo@@q@Cq@Mm@Gq@Qk@?s@Es@Fq@WcAOW@YIg@F]D@[YCS?q@NaA@e@D]Ee@VA`@m@Tg@V]ZM\\_@~AeATa@EQAi@b@OFKPIl@B^RDPPF^@x@v@Ph@\\VX^Rh@@C^?b@Db@Hb@Pb@JdAB\\WV]V@@JYa@Hc@`@HD_BJ?b@HBDb@Hb@@@VSGd@aA?Fb@}@KNWrAARb@@Vc@NEM@_@IOM]E]FIOAKYi@Ma@UEQWHII?EC[_@OKZ?ZOd@K?OMUG?e@k@o@MWMKGOSQK`@EHEHARKo@[a@ISSFESKA@EGLSQDON?WRo@ICs@HSAQEc@M[c@TIZCP?BCJBKE_@W[c@GYMFOIWGZi@UG_@Y_@Qu@aAO}@c@e@a@SLa@a@SEMTUKKYEYSIGAa@SKZY]Ya@XQTSNc@j@Mp@Q^GFWh@HCVg@Z_@Pk@Za@JYTYNE]EHLD@QGEb@_ArBWd@a@PWd@[b@_@RG@_@TKLY`@[^aAxBa@P]VGJAe@g@P]PeBhBa@NSRa@h@o@\\@o@DWL[Hs@QU?WKHTc@Hw@AGa@Pa@JCFWHQ@GDSGY?E@[ECC[\\I@Sf@KFYZ_@NUOMFQ@Wq@Uc@I?Oh@CGDZANQj@_@|Ai@vAIp@[v@[b@IZGHSLSVa@HYZw@f@UAc@MKLA?SR_@?{@|@a@TGNOHADYVYd@E?e@ZOFs@h@u@d@Oh@S@eAXe@ZeA\\]TKP_A~@YNIFIPWRo@t@w@f@IB[\\SbAWr@]TaA\\}@HGCWC_@FU?Y|@m@XOCc@Uc@GIB]Tu@PWNa@FMCk@@SRa@Ny@JIAMDcACSHIJQ?o@i@Yc@Sm@c@k@OMYd@Mj@YVYLMP]^c@j@]\\ODSAs@Ie@Je@AWYEUGKSAI@SHc@\\c@BYJe@Ac@Fc@Ac@Ig@CY@a@Rq@L_@IMYo@[q@{@e@?}Ag@c@JKJo@NGDc@DSE]QaAGWKUEc@DAB]Pc@A[WWMCCu@GMLMCKBa@PKHy@Na@E_@@UKe@AUIWLM?mAMc@FWPIHUf@URa@@c@MaAw@]]]OK?IEYSc@?QRe@?KEKM_@_@a@WG?OFa@UU_@',
          'distance': 21406.1,
          'moving_time': 21536,
          'elapsed_time': 33204,
          'total_elevation_gain': 1609.5,
          'photos': [
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/sI9zbKrjw39DENzqDiqwG2rt2k7EkGFvtMZY-QxNvgs-512x384.jpg'
            }
          ]
        },
        {
          'id': 631959012,
          'title': 'La Forclaz to Champex',
          'polyline': 'etbxG{nvi@VMHq@Is@DiBHs@Xe@Ti@A?Co@Is@NyAI_ACkBK_ADSKeAQs@Is@DECq@Mo@Dq@Mm@Gs@@q@No@Bq@Oq@Io@Jq@?s@Eu@d@yANq@Ze@Ni@NcBBo@NU_@}AUk@Aw@DwBCq@PgBPo@\\[P?FEG[Ug@Mc@A_@D]KYAUBa@IGAYM[CYJq@GgEHg@?MEKEi@Fq@AUDy@Lq@\\WFENQTi@NmAVUM]MK@u@t@yA\\gAd@cAd@wANo@FeBGc@@SDOD}@EoBM}@]iAYe@QKi@Gi@?c@Ec@KcAe@[a@[[a@SQi@Qo@e@sAUg@We@Mm@DgBCyA@u@Pm@T}C^[b@Ev@s@`Ag@NU^SPADGKDICT@Fe@Xe@L_@HWJq@ASNCDq@Tg@b@{ADo@?u@Bm@?YCUf@sAJq@?QTi@GiBOm@Ya@y@cA_@Sa@IiAMa@O_@Y[a@]aBBcBHq@P}C@s@As@Lm@Aq@X}ADu@@s@Oo@Qk@m@qAOgBIeBJk@h@sAVoCXe@Vi@Jo@Ks@u@}@_@Y?Ej@]b@K\\[`ByCL]bAgAVe@HC\\L`@EPGVk@JcB?u@Pq@AYGKI[MwB@WTe@CyBSq@BKNIS_AIKIoA[cAFMCu@Uk@E_@DiCC}@WoCCkA@w@Go@E{AB{@Rm@fCaAb@EZ@b@Db@@j@KhA[`@UdAg@b@Ot@MhAEd@?`@RVRb@Ld@@PHhA@dANdATfARfA^`@G^UWa@Na@Za@`@Q?C_As@Bi@\\@Gc@X_@\\YSOSk@OMO[[_@Sk@q@gA\\Wd@Ab@F~@t@h@p@HDX^LHdAFb@PFHhA\\\\SZ@b@DdA\\\\ZXJ\\Z`@PTNTj@X`@d@?^Lb@C?Bl@r@\\UNC^QPk@\\[`@UEe@Ie@x@u@Lk@Cs@Qk@YCEC@m@Ta@Hm@Pk@Zc@Fi@Rg@AGWWPk@LKFESk@Ko@Um@]Wi@b@]OK@{@s@O]E[IMY]Oi@KS][[Qo@mASsAKa@OeBW_@Ka@IQYgAIMm@wACM]U_@}Au@q@c@OIYF?AIDBE@@EBDGm@Cu@Om@_@WG}@MMSOc@k@Uw@Ug@_@g@c@a@mAeBuAgCs@o@[e@_@[a@Uo@mAqBeBcAyAc@aAy@}AK{@JiBUu@We@@u@No@JaAp@kCj@u@Xe@Ze@\\qBB_Ar@u@Xg@`A_Ah@sAFg@Vi@Hc@Fq@CE?k@JWKk@JLl@kCDs@AaDFq@lAyBMc@HOH_@V_@f@G\\KPM^Id@Id@ATS@M^eXBo@Lk@bBwBRQDMAKRo@Z[L_@Fq@L_@Bk@Lm@E}CIUGa@[gACs@JOAu@VUt@?\\WpAm@b@EjAi@b@EjAFx@e@l@Id@BfBu@rAu@\\_@b@cBXe@\\Yr@OL@`@O`@Wd@GPOFi@JWb@@f@[ZYb@Q`@Wp@Ev@YJ_@`@oAJy@Vc@b@Id@?b@SZa@Tm@Vi@\\_@Xc@z@a@jAB^VjAL`@XFAD]Iu@FQPSnBEZGh@c@DQA[DQRk@DAlBsAV_@FU@u@HoBGs@e@uAKq@K_@J_@FEPWKa@Je@HS\\Kj@Zb@Fb@KNO`@SZ@VCr@mABI`@[b@O\\]hA}A^{@Xg@Lm@A{BBs@EcAGm@Dk@Pe@\\a@\\W?S\\[b@KLYLc@NODkAL]@QU_@w@c@EQCwBKgBBsAX_DX{AReB^cBVcBh@oCd@_BRgBNuCTwANc@Tg@Io@bAC_@DKPIMd@yAVg@L@Vb@A@Jk@ADGKJRKr@Gg@Ba@`Aw@^Q\\[\\a@f@}@d@_@FCf@m@Vi@Ne@NoBAkAFs@Ri@Zc@`@Qr@Ix@e@Du@^gAp@iAPk@Te@p@iAX[NG^[ZOZ_@@a@Kc@Iq@FE',
          'distance': 15126,
          'moving_time': 12872,
          'elapsed_time': 22424,
          'total_elevation_gain': 819.2,
          'photos': [
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/c6MwBtm76DVwoWAd8heBcPAaABlJ6ox8KXklbaauChI-384x512.jpg'
            },
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/YZwEEVgy4AsrpohN4a_J62iIIceSsW975kKc__LvXFw-384x512.jpg'
            },
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/2OLx08jatv7IOG71i4bOb5iWiyBpi_T1PI9ZUBS8_M8-384x512.jpg'
            },
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/5ACjXTdFTkw2xe0z9PZdchpvPrZoYSAslE47u_PwE_A-512x289.jpg'
            }
          ]
        },
        {
          'id': 632945706,
          'title': 'Trailrun from Champex to La Foily. What a day!',
          'polyline': 'yj|wGaenj@Nn@TfBOp@s@nAy@hAABb@L\\IXUZc@\\Wf@OfA@\\f@Rl@\\\\p@Al@dA\\CDCP@d@Ln@Z^\\F?THZR\\FFDJNJ`@JPf@^`@RJPPPr@Z\\@`@F^^t@\\Zf@FMAMZ[HWH?RFBA\\XD?x@Th@DXLXf@\\B`@XLTTUFDDTTXPIFS?[DYJFX`@AqAPXAu@MqAUm@Uc@_@a@a@[TEb@CDL@Jd@Jr@nADLZb@HXVZV@VI`@?h@Cx@o@l@ONNr@k@@QVYBGtAc@fA@b@XbB?JDJ?JAn@cADOR[PgAA_@IIJOTAl@d@HJ^VVl@\\^\\^`Av@t@RhAEZ`@\\tADT?XCr@Dt@BHDh@@ZXLNSPq@Js@l@}ACs@Ko@BYAu@Xq@b@M\\_@Vi@Ns@Fs@v@mCRk@^g@Xo@Lw@DMNO`@UFUEKC[Ue@PWt@RPAXPFLRIzAf@hANd@@^UZe@REX\\`@MP]\\MG?f@KPA@G\\SVd@Rh@FELWLwARIVe@`@YhASf@M|@aAjBeA^YfBaAfAa@d@Kr@KDUBmBNq@\\]dAi@Xg@^Un@Sd@@f@Ad@Jv@fA`@`@`@ZTHBGL?He@DiDCq@Js@^Qd@Lb@RTPx@`@RAHBdA?f@@Xa@Tg@^V`@ThAa@b@Ed@@d@Ff@CrBBlAH\\EIAf@r@LL^RdAZLJVL`@V`BXb@Vd@LbAl@b@Pd@Hf@@f@Cb@IhAEpBMb@Fd@LlANb@AjAMb@BjAf@d@L`@P\\^Vh@Mz@_@|@Mp@?\\RPZ`@\\Vd@Ad@L^TdA^ZK@\\VLZb@Rh@Zb@dBvCnAvDT`@NAb@AfBjAb@H`@QdAq@d@U\\_@Rk@\\c@b@Sb@QrBYjAUd@Oz@}@jAk@b@[Za@Vi@BKXc@Je@RJHLBLVh@TTZh@Th@Zb@\\bBbBxE^zAZt@d@|@Nn@LjB\\hBHt@AHEOG?B?OE`@PEABt@`@rAHr@?X]bBUbBo@xFUn@[dBIfBAr@Et@?x@Et@S~@JF\\@b@M`@Ub@Qb@A^InBEd@Jd@Cb@OVOR@dAc@z@NZf@f@l@`@Tb@F^ZZ`@PCd@J`@TLVb@Tz@Pf@@b@Pb@GVQb@KHAb@UHDJ@z@^bAr@^ZPA\\Jb@EZ@`@A\\DFE^VRTR`Av@~@Hv@PDVN?BELNb@WC?R^ZJd@AVJj@IIH?Xa@TO`@@PNZDHDvA`@T?RPd@Gf@Af@Eb@Kb@?f@GhADd@Hb@Jb@Tt@RJR`@RZFd@Tl@pAb@Vr@Xb@Fl@SHSfASd@U`BJfATjAPb@AVOLBb@GhAWb@?b@Id@Uf@Ex@Ld@?d@GnBa@d@D`@Rn@Jb@L`@^d@xAn@rAZb@Vf@Nl@Fp@Lp@Z`@`@P`@F`@TpBtAZb@b@XV@jAMf@F`@Lb@Vp@v@Xd@zAxAVh@Zb@bAr@|AvAd@Tb@Nd@Bb@H`@Rb@^`@L~@Dp@e@`@Gd@Bd@Tj@`@Zb@|@r@b@Db@Ab@Ub@EFDRl@LHXE`@R~@n@JLLC?AZh@v@fATT?J`@TF@PNNZRTHDHJDNp@Pb@?`Af@p@BJ@RRH@NNZHIIp@@pBfAf@RTTn@VPb@Zf@Dr@\\^\\d@DJb@Rl@zAF`@FJR?K@D`@Xh@b@TLD\\NbAV`A`@d@JlAEXX\\O\\_@d@OxC[fAd@`Av@b@Pf@@f@G`@Jr@h@d@?t@Uh@Yb@L`AHb@Vb@G^[b@Ed@Ld@VPl@?NbAg@ROf@QdAq@@s@GWHcCJiAPm@LUAQNOFMd@uACQ|@UPFf@ExC@zBU',
          'distance': 14317.8,
          'moving_time': 7682,
          'elapsed_time': 9198,
          'total_elevation_gain': 753.3
        },
        {
          'id': 634190812,
          'title': 'La Fouly to Refuge Bonnatti. Long and nice.',
          'polyline': 'mcjwGymij@FEXEZFbArAHPXf@Nx@z@|@?Hb@Nn@H\\XNTBHvApB~@hB^\\\\V\\Hv@@d@O`@S^]Zc@^_@b@S^_@b@QhAQp@Wb@E`AFLARHb@Q\\JVf@b@KbAe@dCaC~@u@b@Ov@aAjAqB\\[Vg@^]`@Wx@}AZ]`Ak@l@m@n@c@v@Qt@EnAYHABDXITk@Za@x@}@XQNA`@PBBD\\?t@a@~Ag@jCpAkB\\[b@Ml@GZKP\\b@BbAe@Lm@Hq@Tc@HYNMJg@Te@VCZ_@Pi@h@]Za@`@UZa@h@eBNMLG\\KLAVQr@o@Tk@PUc@BWg@EuAVC`@QDOFGDBECZI`@Sd@EpAY`@QHIjA{@RQ^S^]VQxAsAp@}@bAu@b@SdA[`@QRMRe@X_BRa@JI@Gj@y@Z_@|@y@b@Sp@i@pDcFZ]Xg@p@}@Xe@XeBReCRo@T_@^W|@eA^YvAmB\\UdA{Ax@u@b@Ob@KTOZ[b@WLCT\\Gp@Kn@c@t@g@j@ULKPDl@F`@FD~@u@dA_@`Ai@\\]~@e@^OXUb@A\\[ZLt@eARMV[FMPU^UTk@Dw@Qs@AY@K`@EdAUXJRCd@BHBj@E@F@J]Fk@Na@TCd@Nh@EZc@b@Yd@GX@HD?HUlAiB\\W\\Kn@ENBNI@g@BUDWFIl@Ir@Ah@Jl@?VDCJED]Jc@FICCVr@Fl@K`A\\b@HjChBf@h@JDd@n@l@fAd@d@t@^?Xa@?e@KgAIOS]Ys@Ia@^AFBLNRb@LjAP`@T|@|@f@z@RRRl@Vf@DRG`ABR\\fADn@KLiAc@CDe@Ac@CcAc@c@KWMMF[@c@N_@Jc@Gk@BQFO?a@RMLVTn@^`@Rb@F|AhAxA|A\\Zj@^Z^Vf@|@pA[NYC{@Lv@fAVd@h@rAXd@XZ|@xDN`BCn@Ln@Fp@Pl@V~AXr@FfADXBfBTzAHr@j@vAn@dD?HLx@Th@x@nDPj@n@lAv@nAl@n@Bn@Pj@\\ZHp@\\ZPVPl@JvAALJn@Nl@R^T~@BRd@~BFNTbBFr@@p@Nl@Pf@RIDHAr@Xb@ZvAFr@T`BAxA@p@Ip@KfB@r@N|@Dp@QhEDX@VDh@Av@Ft@@r@Dp@Cp@FzCFr@Aj@Ph@Jt@l@lAPj@PZEr@Op@g@vAWd@_@Ta@PUPCj@B|@AjAAaAHYKb@Bt@?LHXFn@Ap@V`@Cr@Mn@Bn@Lx@CVf@jA\\fAB\\Tf@Hz@\\z@Jj@Br@Jj@Z\\L^fB|AjBOb@@fAI\\D^PXb@Sd@Yb@s@x@_@LAGiAvAUf@DCE@HWZa@xBmB\\_@Ti@HEDQJC`@Lz@ElB?XBNHp@JnCt@`@TdAXLJF?RRRv@Vn@LbARx@CTFXLhADf@AH@KZG`@OVW|AkA~@a@b@KXc@l@[^F\\KJLR|@KdACj@RRXMx@o@Zm@HAJKVf@NRIn@Bn@OdBCTQj@KNLJSZKn@Ob@NLGRGz@Ur@IJ_@rAKNOBKDU~A?|@KnA\\PVDFJFDDPUl@s@h@a@Dc@Lu@bAKFb@Tr@fAr@X^ZTb@HZON[H[P\\XR\\HDPd@c@Dc@GgACa@NgAPgA`@Y`@C?cAzBKp@?T?RFRAHZbAx@dAn@n@s@cA}@y@e@{AJVV?b@Kd@?`@l@^Bp@XU@c@M]NFl@X^Z?^RNATN\\Ab@Ib@Fb@Tn@j@PX`@V`@Pd@HQk@\\BbAl@f@Rv@`@LRdBbA`@PdAXh@RVh@NJHBZ`@FBJLPZ^VH@VC\\p@JJZ@Ll@VZb@@JF\\b@VN`@Fh@rAZPXd@b@LXd@XLLd@X`@RHHJ`@RJNVf@HZTXTNHAPR`@PHn@Tb@Rj@`@Dd@@\\Zb@PTj@EhBL@VXHBh@b@PAFHP?DFVJRMb@CFBVf@L@TR`@RH?HFD`@Tr@D`@HTDfAJFJVUVXTZn@DN^TN@HTWFFp@Vf@Pl@HNd@xAf@lAh@hBLrAEtBHRLl@^~@^\\p@lATn@tAbCn@xAXd@b@Ph@Nd@R\\b@~@x@^v@\\`ABX~@~CXr@d@zADRf@fAb@RBJ`@XZ`@bBx@H?NFXV\\^`@VpBtBb@Vt@j@j@r@HVz@x@LHZt@b@hBXh@Pp@Jp@n@bBHp@Dr@Mn@K`B@XRx@HNRd@d@b@XRx@dALb@Hl@NPj@NfAd@`@Vb@Rh@^JL\\Z^`@NVhAr@NNtAfB^Zb@HfA^p@ZNVHFVb@h@tAl@l@b@EJDv@b@^Xb@Jv@`@TZb@R`@L^Zv@dARh@LLd@r@v@~@~@r@Z^d@ZhAbAjAx@l@n@nC`EHJHDLKYb@WJOZ@Mz@y@Tc@TYVJ`@IDBIUs@g@KO[UgBaCc@y@Y]a@CU_@?Gl@KNWbAe@b@E^?`@D`@HL@PC_@]Ug@[a@w@u@Ye@Sk@Ya@Ug@a@SOS]Yc@ONSEYOa@D[Em@{@u@c@Oa@Ew@cA_@[GQHEPCt@`@p@Jb@CPIX_@b@Bd@A^Wb@@d@GlCKdAQd@Ab@Bh@I`@UNCjBC`@RdATb@O`BaAVe@h@sA`@YPXEr@Xd@d@G^]Rk@Ve@Tk@\\_@~@w@`@Q^[B?`@JL|@\\\\JX|@NPIJRNpAHFd@@l@NXBZN@HDZQbAFr@Cr@w@dGAl@@h@Ad@Uh@OFII',
          'distance': 21110,
          'moving_time': 18526,
          'elapsed_time': 27083,
          'total_elevation_gain': 1321.5,
          'photos': [
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/z-B20hFvFAOSiVFQ5T7C4D3Px2JZ2DF9dbRNnazs7lg-384x512.jpg'
            },
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/WPY4Q-AMzTF-AXNom9xRVXnxw0hhFRLcrN5F5BnwNug-512x289.jpg'
            }
          ]
        },
        {
          'id': 635011527,
          'title': 'Refuge Bonnatti to Courmayeur',
          'polyline': 'omyvGau|i@?z@GPMTQf@U|@L|@KLOZBLa@BCVM@a@S]UICu@@YXPj@V`@Nj@Lz@Tj@h@VPb@T^DCFBPr@PRDJ`@f@Jh@`@\\Xd@r@h@Z^Vd@\\\\\\V@ZZVf@pAz@v@n@jANPVf@Th@Z\\^Rb@Nl@b@JL`@RTd@\\Xb@Fd@`At@hANl@bAl@N@`@?b@Jb@Db@Nf@d@j@p@lA|AdBxCz@x@ZRHLj@^fAJXd@jBb@z@Ab@Bb@Hb@?b@IXQAFBAAA?H^Bb@Nf@b@lAl@bAR^Sv@sATD@ODERVEp@Br@Mn@HJLn@@p@KpAUh@Kl@Yb@KRSl@A\\Wf@Sj@_@Ze@xAIn@Ar@H~@Th@^xARj@Jj@Zb@v@fCZ^Pj@Z~ABf@Nj@Hr@Pj@Lp@p@lAZZNFSxB@fAl@jC~@pBv@bARf@X^Tn@\\ZVh@p@fD\\fADB@RGHHLRj@Vd@fCrCTv@Z`@^RZ\\Xd@^ZNB~AdAb@P^r@N`@JL`@t@@Xb@R\\Vd@@\\ZPZXNTTNl@^XPh@^ZPh@@r@Dp@h@tAb@xAVd@d@xAHr@j@rCFf@?b@Bj@HNBJBt@Jl@VhANf@v@lA^VLd@@RP^BR@ZPt@Bz@X|A^jAGp@FdAAVHr@DNd@x@p@lCPb@ARFr@Xx@Xf@d@zAFr@FTHr@HjAFPPjBNj@j@bBZl@L^FZ\\Z~@j@VXXd@`@bARNN`@z@v@N`@t@dALd@ANLPTjAj@|@x@bAPXd@fAb@~Ax@zAx@bAp@lAtA~CRx@Tf@\\`@Vh@dBdALR^VNZr@`@b@Ld@H\\TJPf@d@b@n@`@PBFdAd@V\\p@Tb@P^Zb@@d@HfA`@`@QD]Pg@d@KfAEd@Dd@Ab@K`@NhAG\\]fAJd@C\\?z@k@LAZOr@aAHEPk@t@iANEVUDD^BFBX\\Rj@DNDd@VEKUEFGG@AUUYi@Dg@d@q@`@HZRZZT`@JBB~@Ln@HRXRTb@AAFFNCFPLBLc@Pv@Jp@SaA`@Hb@JDF^fC`@Vz@b@Jk@As@Gi@Pm@b@o@Nj@J`AVg@He@Nn@PABs@Fq@HBKq@PE?q@Gs@IgBLEE_ARa@Kq@?[Wi@Aq@Iq@@u@D]DDCo@F]PKv@^CQx@t@TIAs@IgACJ[gAUc@Ok@Bk@BK?HVPJN?ME??g@XPAg@Ho@DA^DJBHJHNZK?w@Fo@@q@DC^RJYV`@@b@D^Zb@ZZT@Tg@b@oC@o@Es@Hs@IeB?w@Pi@n@t@R[JA\\\\^?FIDt@`@a@Xd@ZYPWJWZ]Pe@SS@CVVNX@FC\\@RBDE~@Wt@Sd@?`@JH^TN?ZHH\\CHFV@p@AVCH@f@FHJBZ^H`ABb@Qb@FXAF?VJFFC`@i@Vg@@E?{@Ji@Aq@Xi@TKVpAXc@Cs@Z_@`@P\\ZHVDFTvACT\\fAHb@AzAUr@Q`AMb@Ed@B|@VjA?XDd@P`@RNJTNr@DH@VX`@b@TXb@`@VJd@RJf@`AVZXj@DVADRXD`@\\`@l@rAXb@Fr@`@VZ^Ln@Rh@r@hA^XTV\\Nd@?^TLNDLPPd@Jz@h@HH`@VpA\\f@Bb@Jl@^Np@z@n@DNv@ZJ?`@Tr@Pb@P\\ZZF~@f@DDNVhAl@fABj@Gf@D\\XCFX[Ti@Ls@bAa@Ti@P?`@K`@QTAHVGL^`@f@Kz@ATBXMlA\\f@Hb@Fd@AHRt@JBBpAXJFL@x@T\\TpATd@?NBR?fA^f@Bz@VDAFB~@QXYd@ENE^V',
          'distance': 13442.7,
          'moving_time': 12447,
          'elapsed_time': 17974,
          'total_elevation_gain': 343.3,
          'photos': [
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/DoCoVeA8OO8O9zG4BpYR6yKTuIiX4464k4KN21JRA9o-384x512.jpg'
            }
          ]
        },
        {
          'id': 637507179,
          'title': 'La Visaille to Les Mottets',
          'polyline': 'somvGwrbi@Ft@TEh@]QDS\\It@PJPFRXv@LHJ?BDDFn@nAz@RBAXLFDXLTDXFFJXR^XzAGZHTV\\N`@Jf@Z^HL?N\\\\d@~@j@f@BRCPMNm@Ku@e@Wk@QII?ILCVBDEPB?Pb@RTRb@JFHLVLVZNZTRh@DJH\\r@VVTJLZH^JLVJRPN|@B?X\\ABBHDr@XZCZJXvB`BV^Pf@PNJZPTFZDt@V^CZ^RX`@B\\@h@Jp@Bj@Jh@?LRn@Fr@BFDp@FVDj@FHBPRXHp@Tl@Bp@DVz@lAd@~APnARp@Ln@?\\Kn@Bp@Td@`@^Nl@?PMr@UtB@PHd@Hr@UrAq@lCCt@EjADr@FR@p@Lb@?l@BXFNPv@Z^R\\t@p@Pd@ZbB~@nAB~@Jt@Pl@Jt@Gr@ChBUxAEr@Kr@@b@d@pAFXn@dBFVr@jBHj@Az@MlAP`CAxD~AhB^|@Dd@a@~@}@Zs@r@c@PsAo@O@YVYb@MJc@P]Xc@RuA@_@MQWSy@Cm@Ts@OeB_@}A@u@Jc@MXEl@Wd@YX[LWUOALODFA@A?@P?EXFp@CRo@XA@G^YX]F?b@N`@CDNu@KRn@Rb@J`@?t@Fp@PLCl@Kl@Fh@C^Hd@J?n@a@RYn@]d@k@l@QNLVJJ@NNNBd@KBL^?\\CBP@e@Po@\\q@Bq@Me@Um@Yg@EGk@a@Sa@C]@]PcBCwAFOb@Gb@AZ\\l@nCf@pAX`BLbAPl@Jn@PZRj@d@zA`@r@v@bA\\`BRn@JpAChABd@Hp@p@pA^X|@f@Z^Rb@ZnBJVNn@Fp@AlHDp@Pp@v@dBv@xBl@nBLp@Rh@\\~Ad@~ATl@Jp@j@lCJdAVlAHn@r@`DRnAPn@Jp@\\bBFl@Lr@z@jEZ|BPl@PbAb@pBDd@n@tCJp@Fp@Ll@NpA@r@EP?NGb@GhABp@Fp@Ln@Th@Hp@UxBDt@PbBJd@n@jANf@Z^Pl@In@A\\B`Cv@jD@NGXIRInAIDEFH^T^Dh@Lf@R`@N`@X^^TTTAp@NXBj@Uh@Y^Qf@Cf@Ln@]PYFFFJM`@^^A`@MHo@^WT]ODLg@N{AGKTCj@d@j@JPF`@VXb@\\PP@NHTBb@l@JHNRbAhBRR^\\RTz@^XHBABJj@d@l@|@d@\\d@p@d@x@p@rAp@z@`Al@XXHLTn@JEbAz@d@pAXj@Vd@PRh@t@~@bCb@zAVb@Pn@Th@Xd@Pn@\\\\Rf@b@zATj@Rl@Np@Z`@PJ@JrAjDRl@^f@L^z@h@n@nAlApBn@|AXb@\\`@Tf@lAxE|@`CVf@Pl@ADbA|BHf@Dn@JVBp@Cr@Hp@Cr@D`@C~AJh@Rh@?d@DJJT`@JTf@V^j@l@Pf@FQ^]^P|@VFD?NP`A?n@D^Ex@Dd@MdBPHJa@E@?J[]d@j@?RIn@Ad@ITEj@T`@Nl@Jp@Th@Z^Vd@Rj@Jn@Ln@Dn@Pl@Jp@HzADr@Sf@W`@PvCNn@A`@R`BAn@Br@Gp@BdBCj@HdCZ~ADdABRPj@MSJDKaA@BBA@FGG?\\a@d@KVDr@DN\\x@Px@l@rATp@F\\Rt@b@dABLx@fB`@hAVh@v@`DRhACRXdA?J^~ARjAf@lBVdAVv@NdAJ\\J`BId@[lAWHM?d@WRXWQHAECb@g@VGb@rA`@TTRXf@b@`A`@vAHPJp@d@bBNXv@lBH`@Pl@Jv@F\\Rn@\\p@HXF^Dr@L`AJTR|Cj@z@^Pb@L`@RFAX_@p@Ub@YNA\\Ol@g@f@m@NqAf@_Af@A@KE_@LKTAZIb@RPt@NMVFLPBSPj@Z^\\RXVX`@Jn@?r@JEDR?XD`@DJVb@n@dCDt@Ad@FN\\h@DPDHX\\z@^Z^\\Yb@Bh@CXOR[RECDFNL@E?CCF@B@E?@?J~AXd@B\\JD@NCx@H\\Rl@Zd@?DPPBLAjBJRRJRTVh@X^R`@TDb@J`@R^ZZ`@`@~@LJTHJHPDLJb@LJRNJ^CL@d@XR`@n@E`@^Lp@PrAN\\BJ|@fAf@`@XKTHiAbAnAJAZCAHPRN[JFLKRe@E}ABm@Qa@UEFLJX`@|@~@^Tf@`@U`@_AEeAUc@Cg@?c@Me@AID@Hr@hAZn@GDGv@?LLXCD_@HNW`@LNRJCPBLJ`@bANl@VZOPc@GQGc@Ea@QCDHh@?NEBo@WOo@GMk@CUl@ORGC',
          'distance': 16891.5,
          'moving_time': 14096,
          'elapsed_time': 23084,
          'total_elevation_gain': 988.4
        },
        {
          'id': 637507924,
          'title': 'Refuge Des Mottets to Contamines',
          'polyline': 'i_dvGw`kh@XPFJbBrA`Aj@LN`@T^A^OXe@`@EN@BJDr@Pd@DDv@f@ND\\\\p@RpAh@b@FRT`@l@x@~@fAbBJn@LXr@nAJXVV~@h@d@RFFlCrERR\\Tv@hAPd@DRHFJj@BzABXCx@d@z@RNJXFJ~AvAHXd@r@Vh@^Xb@Jz@^H?ZQN\\nAvATHL@FV@NA~@]tBGfACn@UzA?ZM\\c@?_@GAD@JHXN|@HVA`@GAmAu@m@WGB?RBDZZzBdD^^Vf@EEDHBZ@lAAt@Cp@[GSk@[eBYa@a@We@Is@GO?GB@T~@z@Rl@V`BBr@Cr@Dr@Fb@Xz@Nz@Ph@BNKDqBgDYg@Ui@CYGS_@[c@Ma@AqAYc@BAA_@eAUk@_@]u@c@c@cA]ODn@Tj@v@vAHp@AfATh@r@jALp@HjBNl@^z@Ll@g@pABp@]~AIbA@r@Ph@Dv@@fBFfBCr@Bh@LfBNp@Hr@FpAOl@KZWP?n@Jl@Tb@Nn@Hj@In@U~@?l@SvAG|@@p@Ql@Sh@ERQp@In@Uh@On@[|AOh@IFe@x@On@o@~ACZ]n@MHG@y@p@c@P[\\Ul@a@LQXHv@SbA@DH?@DGn@Dp@@r@In@Sl@SbBUf@[\\Cr@BJCj@SzAHn@CTBp@Ip@Y`@Bp@?n@e@pACn@Bj@Sh@Gn@Qh@Ef@Sd@Eb@|@T~@^n@Q`@GZ]ZAXd@PNKrAD`BVd@Zb@NDTh@`@FLHb@Ot@~@`@Rb@ERm@Lt@AZP[^K^@Ap@VVTNPVKXPXTTJ\\Ml@Sf@WfAOT]FDf@@n@LjCPXFY?VZb@HfB@r@NfBBp@p@`E@p@JfB@r@?n@Er@Ap@Sj@In@Ep@Gn@UtAMl@KZCb@Kh@m@zADEMn@En@a@lAEl@YzACp@COGjAIl@i@jA?p@]TKl@Yf@o@pAg@v@Jd@AE@EnDjDl@|@Vr@FDZn@Xb@d@H\\\\^V|@VBHXNrBTd@JdAL`ARn@FL^ALPZND`@h@@JLNHZPAbAd@x@Nb@D\\ZNRZ\\DNLt@Fh@@j@lAlCFPT^^XBFJnA@j@Fd@FGEN]Rc@RO?s@zA[P]GALDLGl@Bn@]rABh@ZJRTANMXG@CPKpC?d@Ed@G@Y^Ez@MX}@t@ERa@Bc@N[Za@z@]pA]Xa@Ha@F[Zw@f@U`@@NQd@a@Lc@@c@Gc@?a@Ja@De@@Yd@Sd@]VCNOh@INc@J]^a@V_@AQV_@PWTJh@ADQLu@@eAVa@GgAJeACGEk@JICU]e@W]Ya@Da@`@I@_@P]^Ud@KNE?kAjBa@V]b@c@fB?VIDEJFTMKDOU_@YYCM}@y@Y]a@U[_@_@M]Wa@Mi@AKUiAeAWe@MGW[Gm@O[I[IIC]Sc@Qa@]GCEEQLIGGYAo@{AW[Mc@Iq@Ui@GCWa@BCQUYm@AK]_@ROO_B]W_@OcAiAa@Wo@s@]k@cAa@e@Fk@MWY_@SsAuAc@KUQg@i@EMi@{@CKGGo@Wa@K_@EYA[Ey@[u@o@c@@c@Ec@OQ_@G]EECS]Sq@kACK]JGOID]Ia@U[Ye@i@mAcBISAn@NhAG~@M\\Cd@KZEFSt@A`@K\\M~@[lA[b@m@V]XJN@HKFUb@KLa@Hi@f@w@NKFYj@QT[r@m@z@Sj@k@pCSZQNWb@]dA]TBg@@DEt@EhAI\\KFEF_@bA]Vc@Nk@^q@t@q@L_@b@MDo@@]DWLKL[?STSW_@K]BCGQV]Lc@t@]?Sp@c@HYZQj@[b@c@RKPWRc@Bc@Oa@UI?KMc@G_@JGFYOs@m@W[g@}@M]GG?GEIq@gCIQ[YAo@G?YUYc@{@g@OUOKXECFa@M_@Ue@@Kn@]Tc@Ic@Ac@TK`@KPe@IYIk@g@u@[mA}@SMKCMB]Va@Pc@Nc@De@EgAu@SCWOYE}@?u@K_@Oy@UYOc@M[OiAWM?kCcA_@Ge@Aw@c@e@Gy@SAUc@MO?c@Iw@IkAYa@Ya@o@aAe@[c@e@_@aBk@eAi@]YeBc@oBWw@EOG}@u@QEa@Sc@KiAQc@KMY]]a@GuCPy@Ce@Ge@Bc@CWCSMaAAUEcBj@kAOe@COF[^_@f@YXIRa@Vc@FSJc@Lo@?[B[JOVSTSJQRWDm@REAOFo@D]GWi@Mu@]Ye@?c@Ee@F[Ck@T_@^c@G]]c@O}@O_@OW?_AK_@SGA]_@IGYEWBkA\\a@Ra@Hg@C[VIl@u@t@a@rAKHSj@GXWZ]l@w@f@S?g@b@U\\GCCFGDG]Nf@IMJJLp@?KWs@ICc@@a@Tc@He@Aw@Oa@?e@G_@Wu@Hc@Cc@_@u@a@CGcAUK@UIw@m@c@Ca@USQKGIA]YACmAi@aAQc@S[SKKYGI?a@]]M{AmAOC_Ao@eAm@sAyAY_@Yo@W]}@{@_@W]a@y@eBO_@Ye@e@k@UKe@IW@c@Hi@KUAYSi@o@cAw@u@{@EMa@Yw@KIQq@e@q@m@[a@a@S_@c@g@]c@OaAo@m@aA_@[]a@GCQOUYk@g@iCkCS]CKYc@o@{AMe@}@c@}@GKE}@Ka@Se@Ig@Ca@KOA[Ms@AQG_@Ae@Mg@Bm@O_@@CBG@]Ze@Hc@Gc@]g@OQAGIa@Mc@@OE]BaAOSC[KoAUk@a@}@]OEMKc@SIOQCMFG?e@u@]]a@ISMM_@[]]Q[Ue@KQOa@BSKqAcBq@DSF]\\a@Ja@DQCy@_@UG[Be@Kg@Ws@BUt@a@Xy@T_@Pk@BgATa@CmAH_@OkBG[EQ@a@J_@Ti@j@_@Xq@P[?w@Je@Bc@CgAKa@O]a@][Wc@DWAQ_@S]a@Sg@CSe@Ce@Fe@B_@NWDkAVe@Fc@@yB\\mADc@De@Ja@T[h@a@REFUDc@T]f@cAr@gAZaAj@c@Je@P[Hk@Bg@FYOYGMG_@I[?wAHWd@}@r@Op@Er@?r@VbBBr@Ar@CVa@RmBUiAFqANgARe@Ec@Hc@N[PMZc@Jc@GcAc@g@M',
          'distance': 23295.9,
          'moving_time': 20778,
          'elapsed_time': 28006,
          'total_elevation_gain': 985.2,
          'photos': [
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/0fYY3yisPLcAaGqgzI6Zb9EEOgJoSFmH00yZ_x8dnXA-512x384.jpg'
            },
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/An928CpGLdAKDRoiKVQd2M2slAEVZoadci1MlzkpedY-384x512.jpg'
            },
            {
              'url': 'https://dgtzuqphqg23d.cloudfront.net/A6J-gHmb4VxLXiZc7nhn4_0kmCVDft98Yz-5hP82syk-512x384.jpg'
            }
          ]
        },
        {
          'id': 638530377,
          'title': 'Contamines to Les Houches',
          'polyline': 'wtuvGi``h@^F`@Vb@Jd@Eb@g@fASf@A`Bo@d@Eb@AfABhARb@AXM@MCuAEu@UeBDs@Ru@Zc@d@e@Pw@\\[X?FD\\ANGLATHtAe@b@A\\DLA?@PIb@s@Cg@Si@_@Uc@KGi@Fh@HONQb@QhASb@Md@QRc@Jm@Iq@Y_BSgBOo@Bo@Ms@KcB_@a@?YDq@e@uB_@[Ya@Ui@Mq@Eu@Mm@EgBWg@SaA@u@Cs@Mq@Hq@k@qA?iB@s@X_BAs@Io@X{BA[@UEk@S{AB]E]Ak@CAKg@@q@Fm@Gq@Oo@YaAYc@Ui@Bu@Gq@e@yA[_BUg@G[CFQ_@Sk@Es@Om@Si@aAq@c@DSh@g@|ASh@Ir@Ar@Ir@?r@Nn@?p@XbBKp@KDa@OKSXKOU[_@a@K_@[a@Sa@?c@@_@Xa@R]^a@HWg@y@y@Si@OeBa@Oe@Be@O_@Ws@iAUQc@@[d@[[Cq@Ye@I_@GILKb@EXc@AQa@U_@MYg@][]_@a@W]]a@Wu@cAWe@Sk@_@WoBGc@MmAAc@Hc@Ga@Uc@Ic@I{@@gAQc@S_Aq@c@U]_@Yg@m@qACUWg@aA_Aq@We@}@a@Y[c@Om@Ao@Qk@Dk@AF?JBIKrARm@VDFGBW`@}At@eAVi@Co@?gBe@wAe@_@c@k@KKO?m@OGo@Fg@Lo@Du@XeBPo@Bs@?e@Wc@][Mm@m@[SBc@GWg@a@Ma@G_@@s@RYAaBa@]EIE_@IDIYLc@De@?a@Yk@F?o@Ni@f@c@^SNe@WOEMVg@ZY_@QE@OITc@Jo@PWAe@FiBCmBHm@KUCs@Ug@_@JBI`@BGMD?OgAXc@GL_@Za@RE?_@UMAUPe@Ha@LMAc@Le@Ei@JKFQDyAzA{@X[FIAGE_@O_@FKv@Qn@Kp@Yp@g@xAWf@YPQ^CVSh@_@Za@P_@lAIBQVCb@CJWZ@r@Ml@Yh@UVg@Tc@d@Ih@m@|AEf@o@fACLONSFSLK`@CPQl@YZGTc@t@gA|CI^Gp@Wd@SbBC`@Qj@URGPa@xCMh@YhCEfAW|As@lCQj@Wf@_@Xc@HIFe@Ce@?e@Ge@Ac@O][g@?c@ESLe@Cc@Fc@HeAXu@Wa@[]g@Uf@@t@G|@Uf@e@JMf@MT@PQ\\o@^W^Al@E^GRAVI^U^iAvAUHEAODQHKRHALXVhAAPUh@[b@{@~@s@fA_@XSJWBg@VQVkAh@_A|@IX@FO`@QnAO^AVG`@M\\KHa@O_@Wc@?gAIY\\qAnDOVKHYh@]Gc@Ac@Mw@r@sAnBg@Pg@UI@Yh@Ff@RENsC@oBMo@?U]mAEo@m@sAIq@Ck@Mq@Gu@Bo@Sm@Mo@Wg@Ks@c@}Au@mA_@]Ui@c@w@CWy@oB_@mAa@WM_@Bm@NcAPi@b@i@Ai@ZaADq@@uAR_@Lm@Xg@Ds@Rk@E_@DUB[AKEIEQI{@G]_@UYc@Mi@?s@SgB?s@Es@KYAw@Iq@Aq@LiAEc@s@Hd@Ib@WMH]?DDTBJZ_@T@QGCU@T?RPI?HK\\gAN]?q@g@y@CS@wAIWBQG[HUFyAEU@KEa@Oy@GGEYCGAk@GYEuAGm@CCC]Oo@?[Qa@Kc@F_@DaA?[]e@O]Cg@@OIULe@A_@Rg@JQICKIUTMBu@h@Eb@[PKT@@CPOFIPCz@YODQSLIXYY?Hc@|A@t@Ep@GRFbAC\\Ml@QVMZo@bACJY\\gAC_@Wa@KQm@We@WTX?DSNECAIa@KMi@U{@aAKq@Cu@@s@Jq@DeBc@Yc@CYa@Q}By@cC[cBa@Ie@Lg@ZWF_@Xe@?[KOM[_@_@Y_@c@g@Sc@Mc@Sa@W[_@Wg@Sm@Iq@Si@WPCr@UdB[Z]Q[_@Ui@[_@gBo@c@G[XGd@DL]Xc@H_@XKpBCD_@\\YFS`@q@bA[Fa@E]_@g@wAq@kAa@Yc@Oa@SWe@Bs@Gq@O[Ya@MKe@Ga@RGHC`@IJOHGA[Wc@FaAn@Ep@?r@Gr@AjBSh@c@FY]Oq@g@aB[Ya@IIHEf@Ad@WbAOj@Y\\YHe@Fg@Pe@Bu@J}AIc@Iq@Aa@Io@EIIIM\\{@Dg@SKS?c@Ko@QKGc@H[Rc@Ps@Da@VKXEt@Uj@c@TUBo@_@}@w@]_@s@i@a@Qg@Ms@?s@Se@[Ya@a@_@Se@K?Ba@Gu@@u@MeAES?]Nc@WaBOUQ@_@Ga@Qc@G[KKWm@k@COOMOYa@UMC[_@CQa@e@?GO]i@s@o@e@Sm@Go@Ds@?o@Mm@@E`@WNi@Ws@Cu@Dk@?a@CgAGa@Pg@S[[GMGAGBk@Pe@H[JSBS?Cg@KB_@Vg@Kq@@QI]?KBGPEh@JN?n@Mx@EVKDI?U]]Qe@Es@Je@@YCa@SSa@k@@c@OU_@UKS[WI?_@QIOPk@LIT]Ri@@[KOIIc@Re@C]XQF]KUE_@Ba@Fc@GQo@Js@PYLYLm@Ks@@MESk@y@QQKSDsAJ]He@c@We@_@EQJs@Dq@a@Ic@LMH@ZABg@QCDDHLFUf@Qj@Yb@_@PYa@CYHo@Ro@Fs@Vg@Pm@r@_@Ua@Ia@OAG@WNKJIP_@\\]XCAKUEw@NoATcBJYJM`@Sb@Gj@OHO?SIEe@@a@Sc@Ie@Bm@EEE_@L_@Rc@SIGc@MKNMf@?NQl@Yd@a@Tc@RKBa@TOd@AR_@`@Sn@AzBEJ@NCZk@r@Jg@Xe@F[Mq@Ea@@YIG@C[a@MW_@eAQq@?c@Bq@Aw@Ci@ViBTm@F_@ViD?i@EOI_DLg@Vk@i@DBe@CIAWXgAGYe@GIE?MWe@]FQo@Ig@?a@\\Gh@WzAsAfAUjAHb@Ab@UJAf@k@Pk@RSHFR{@AKJUN{ALk@NWJe@JUF{@JKPaABa@HUF[Qo@h@kAPm@TaBDo@DMDyAHg@O_@Do@Jq@Eq@Ii@]sDH_CLkAJcB?sADIGUKq@CgADq@Ks@Aa@Ic@ECYAEQGkAUk@[_@UCWMe@m@c@Sa@Me@WgA_@y@Ci@Ge@k@Yc@GSi@{@MFUV?h@a@\\MEYe@_@]c@KM@_@VUf@QTIVIn@CfAUx@G\\QAc@y@[a@g@aAKM_@HAFSDB@c@Fc@Dc@Ma@Wc@Ia@ScAa@m@Ea@Oa@SeAeAQCOHYBuAc@_@YAGCP',
          'distance': 22394.2,
          'moving_time': 19591,
          'elapsed_time': 28228,
          'total_elevation_gain': 1346.5
        },
        {
          'id': 639551838,
          'title': 'Steep hike from Les Houches into the fog',
          'polyline': 'wlcwG}boh@@HDJ?Cb@Jb@N`@@`@STLv@`AXH`@B\\TfAXd@FLDxAt@fACFCe@CgAa@eAo@]a@e@Ea@QWG]Qc@[E?_@[GOy@_Ao@gAQm@YcB@gBAGMa@[e@Qo@oB{AYc@gBuAI[KS[[c@Q[c@a@ODt@Rl@CTa@Qu@gA]Y[c@_@PG|@Qn@Yd@SJ][An@@t@If@Sl@uBz@[_@Mo@[FEx@Gp@Ol@SbBDf@Oj@MTDt@Ah@_@VQFOg@Co@DS?SLkA@k@Ok@Eo@a@[Yc@WJSj@Ml@a@QCp@MP]k@QgBCs@Gq@Qm@Iq@Aq@G_@CWOSKe@EIF[JaBEk@HoA^wALq@Ao@WcBCs@]]s@mCIs@GiBOm@Mo@Sk@Cu@UTGr@MTQm@QeB@q@Iu@@s@Oq@I}B[aB?u@a@aBKCYXGu@Dm@Sg@[_@IOY}AEPC^Dh@Ad@If@Az@Gh@Bf@Mb@Br@Mn@IfBQj@Wg@Ks@CgBQk@SSMo@@s@Au@_@{AWUO\\[C[YYe@Oo@Ee@@u@w@cAI@QGi@sAq@}@][BYCs@?u@Y_@a@Q]YKq@i@uAMo@@q@Gs@?w@Gm@[WR?{@]Ye@m@sAQiBc@c@AGc@Gc@N]WSGgACa@Ka@@Rk@WZa@B^uBDq@HYM[Ig@Ci@KKKo@BSOg@QSCa@Ke@CCCSWu@Ee@[y@U_@][M@]KKUsAy@WKk@e@GIUBWGQKO_@[e@c@c@Si@][Si@Y@a@MAMk@qA[a@g@e@VM?LO?QYAGAVOHDJ]XUAKRYCQa@E@YVc@@aAl@UFO?O[cBRa@Lc@BGXa@R}@q@Ye@]YYDCZNf@D^g@KOGSQCTa@OC\\_@?_@@Ji@[Sa@I_@WITWSGq@Ua@Au@Bg@Q^ACMVUXW_@EVSi@M@KYKF@EIKMRMSSIRk@Xa@HQIo@Lk@Bs@KW?DLT?f@CVMr@HLDLEL?QQs@N}@OPa@?SLa@DGKHOPQa@Jc@Bm@~A]HIQi@nAG\\a@Qc@IU]Bo@VeAJq@MN_@Vc@BqA?Y@CDq@kA_@[GI\\QGUBi@V{AGi@@MIm@EKGw@]eADMi@k@GMOq@M_AUWe@y@u@w@EO_@]E?Kj@Fp@CFGBq@Im@a@c@Km@a@MU[OOEc@AeAQ_@Og@Kc@a@Uc@_@SoAa@a@?STa@L_@BGM_AYOm@q@JOWUO]B_@G_@B_@HY`@a@LWKD_@BCKIc@@Jk@@_@Ve@`@SlAiBEq@Ub@c@L]FL}@GIG@C}@a@C_Ar@aAf@KYGEa@J]VKSPe@a@Fc@@SC_@WYYfAYKM]WPg@J_AJc@C^Ol@QZ?IUC@KGm@VSWDC^`@LAJKTTN]Va@G_@WSCNt@HRPVL@eA?a@K[]Wa@_@Wa@Qs@Gg@Dk@ZKPDl@_@@WUUBMp@IJ?a@^?j@b@LC_@MHc@^BLCDF]Ec@MDEZCIe@EGQKKHyAcAO@KcARY`@Ur@G^SFADFt@Il@Od@Y]UOUDe@JEDk@SMc@QKMGs@Dq@`@e@b@Q`@Fd@@ZUAIa@_@_@GcAs@c@Ei@Lc@@iATa@K_AIi@Y[_@U?SEQMe@m@[URKREr@YLCd@B\\Eb@Sw@i@S_@i@k@B_@^KNOL?FY{Ai@c@QQSGWBg@d@D`@AJk@Sm@CQBM?[]Se@I]]K_@Fq@\\[b@QBEDq@He@DQVi@Nm@TqCAm@]s@SQY_@Ok@MQi@iAYc@OES{@P_@VC@UBCJTHD^e@XK@eADYPo@L}AHUh@}@\\[HEd@Kn@Gz@}@R[ZqAFKTKZWFUIsAIs@Aa@Y[',
          'distance': 13611.5,
          'moving_time': 15027,
          'elapsed_time': 18875,
          'total_elevation_gain': 1632.7
        }
      ]
    }
  },
  strict: debug
})
