const axios = require('axios')

const getData = async ctx => {
  const dateTwoWeeksAgo =
    +new Date(new Date(Date.now()).toISOString().split('T')[0]) - 12096e5
  const dateToday = +new Date(new Date(Date.now()).toISOString().split('T')[0])

  let res

  try {
    res = await axios.get(`https://api.biorxiv.org/covid19/0`)
  } catch (e) {
    console.error(e.message)
  }

  const { collection } = res.data
  const manuscripts = await ctx.models.Manuscript.query()

  const currentDOIs = manuscripts.map(({ submission }) => {
    return submission.articleURL.split('.org/')[1]
  })

  const clinicalPresentation = [
    [
      'clinical presentation',
      'clinical characteristics',
      'clinical features',
      'clinical findings',
      'clinical symptoms',
      'clinical symptom',
      'clinical manifestation',
      'clinical manifestations',
      'clinical outcomes',
      'virulence',
      'case fatality',
      'case fatalities',
      'disease progression',
      'disease course',
      'clinical deterioration',
      'disease exacerbation',
      'spontaneous remission',
    ],
    [
      'COVID-19',
      'COVID 19',
      'COVID19',
      'COVID2019',
      'COVID 2019',
      'COVID-2019',
      'novel coronavirus',
      'new coronavirus',
      'novel corona virus',
      'new corona virus',
      'SARS-CoV-2',
      'SARSCoV2',
      'SARS-CoV2',
      '2019nCoV',
      '2019-nCoV',
      '2019 coronavirus',
      '2019 corona virus',
      'coronavirus disease 2019',
      'severe acute respiratory syndrome coronavirus 2',
      'sars-coronavirus-2',
      'coronavirus disease 2019',
      'corona virus disease 2019',
    ],
  ]
  const pharmaceuticalInterventions = [
    [
      'drug therapy',
      'drug treatment',
      'drug target',
      'drug targets',
      'drug trial',
      'drug trials',
      'pharmaceutical',
      'drug repurposing',
      'antiviral',
      'antivirals',
      'agents',
      'corticosteroid',
      'corticosteroids',
      'Angiotensin receptor blocker',
      'angiotensin receptor blockers',
      'statin',
      'statins',
      'hydroxychloroquine',
      'chloroquine',
      'oseltamivir',
      'arbidol',
      'remdesivir',
      'favipiravir',
      'angiotensin-converting enzyme inhibitor',
      'angiotensin-converting enzyme inhibitors',
      'ACE inhibitor',
      'ACE inhibitors',
      'immunoglobulin',
      'immunoglobulins',
      'IVIG',
      'arbidol',
      'umifenovir',
      'azithromycin',
      'carrimycin',
      'danoprevir',
      'interferon',
      'interferons',
      'IFN',
      'darunavir',
      'prezista',
      'cobicistat',
      'tybost',
      'Recombinant human interferon α2β',
      'recombinant human interferon alpha 2 beta',
      'thalidomide',
      'sedoval',
      'thalomid',
      'methylprednisolone',
      'metipred',
      'urbason',
      'Medrol',
      'pirfenidone',
      'Esbriet',
      'deskar',
      'bevacizumab',
      'mvasi',
      'avastin',
      'fingolimod',
      'gilenya',
      'gilenia',
      'bromhexine',
      'clevudine',
      'povidone-iodine',
      'betadine',
      'minidyne',
      'Ruxolitinib',
      'acalabrutinib',
      'calquence',
      'Vazegepant',
      'eculizumab',
      'soliris',
      'lopinavir',
      'ritonavir',
      'norvir',
      'imatinib',
      'gleevec',
      'baricitinib',
      'olumiant',
      'dexamethasone',
      'decadron',
      'leronlimab',
      'Dalargin',
      'mefloquin',
      'mephloquine',
      'lariam',
      'spironolactone',
      'aldactone',
      'carospir',
      'tocilizumab',
      'clazakizumab',
      'pyridostigmine',
      'mestinon',
      'indomethacin',
      'indomethacine',
      'Indocin',
      'tivorbex',
      'azithromycin',
      'Zithromax',
      'danoprevir',
      'tinzaparin',
      'innohep',
      'Heparin',
      'nitazoxanide',
      'Ivermectin',
      'niclosamide',
      'sarilumab',
      'kevzara',
      'Camostat',
      'tretinoin',
      'Retinoic acid',
      'isotrentinoin',
      'vitamin a',
      'methotrexate',
      'nafamostat',
      'melatonin',
    ],
    [
      'COVID-19',
      'COVID 19',
      'COVID19',
      'COVID2019',
      'COVID 2019',
      'COVID-2019',
      'novel coronavirus',
      'new coronavirus',
      'novel corona virus',
      'new corona virus',
      'SARS-CoV-2',
      'SARSCoV2',
      'SARS-CoV2',
      '2019nCoV',
      '2019-nCoV',
      '2019 coronavirus',
      '2019 corona virus',
      'coronavirus disease 2019',
      'severe acute respiratory syndrome coronavirus 2',
      'sars-coronavirus-2',
      'coronavirus disease 2019',
      'corona virus disease 2019',
    ],
  ]
  const diagnostics = [
    [
      'Specificity',
      'PCR',
      'rapid test',
      'false positive',
      'false negative',
      'positive predictive',
      'negative predictive',
      'predictive value',
      'immunoassay',
      'clinical diagnosis',
      'assay',
      'point of care testing',
      'diagnostic testing',
      'diagnostic performance',
      'diagnostic utility',
      'differential diagnosis',
      'molecular diagnosis',
    ],
    [
      'COVID-19',
      'COVID 19',
      'COVID19',
      'COVID2019',
      'COVID 2019',
      'COVID-2019',
      'novel coronavirus',
      'new coronavirus',
      'novel corona virus',
      'new corona virus',
      'SARS-CoV-2',
      'SARSCoV2',
      'SARS-CoV2',
      '2019nCoV',
      '2019-nCoV',
      '2019 coronavirus',
      '2019 corona virus',
      'coronavirus disease 2019',
      'severe acute respiratory syndrome coronavirus 2',
      'sars-coronavirus-2',
      'coronavirus disease 2019',
      'corona virus disease 2019',
    ],
  ]
  const modeling = [
    [
      'theoretical model',
      'theoretical models',
      'mathematical model',
      'mathematical models',
      'mathematical modeling',
      'individual based model',
      'individual based models',
      'individual based modeling',
      'patient-specific model',
      'patient-specific models',
      'patient-specific modeling',
      'agent based model',
      'agent based models',
      'agent based modeling',
      'forecast',
      'forecasting',
      'projection',
      'projections',
      'scenario',
      'scenarios',
      'health planning',
      'nowcasting',
      'seir',
      'spatial',
      'demographic project',
      'demographic projections',
      'SIR',
      'R0',
      'basic reproduction number',
      'transmission',
      'simulation',
      'simulations',
      'estimate',
      'estimates',
    ],
    [
      'COVID-19',
      'COVID 19',
      'COVID19',
      'COVID2019',
      'COVID 2019',
      'COVID-2019',
      'novel coronavirus',
      'new coronavirus',
      'novel corona virus',
      'new corona virus',
      'SARS-CoV-2',
      'SARSCoV2',
      'SARS-CoV2',
      '2019nCoV',
      '2019-nCoV',
      '2019 coronavirus',
      '2019 corona virus',
      'coronavirus disease 2019',
      'severe acute respiratory syndrome coronavirus 2',
      'sars-coronavirus-2',
      'coronavirus disease 2019',
      'corona virus disease 2019',
    ],
  ]
  const ecologyAndSpillover = [
    [
      'zoonoses',
      'zoonosis',
      'zoonotic',
      'cross-species',
      'reservoir',
      'reservoirs',
      'origin',
      'ecology',
      'spillover',
    ],

    [
      'COVID-19',
      'COVID 19',
      'COVID19',
      'COVID2019',
      'COVID 2019',
      'COVID-2019',
      'novel coronavirus',
      'new coronavirus',
      'novel corona virus',
      'new corona virus',
      'SARS-CoV-2',
      'SARSCoV2',
      'SARS-CoV2',
      '2019nCoV',
      '2019-nCoV',
      '2019 coronavirus',
      '2019 corona virus',
      'coronavirus disease 2019',
      'severe acute respiratory syndrome coronavirus 2',
      'sars-coronavirus-2',
      'coronavirus disease 2019',
      'corona virus disease 2019',
      ,
    ],
  ]
  const epidemiology = [
    [
      'epidemiology',
      'epidemiologic',
      'epidemiological',
      'disease transmission',
      'transmission dynamics',
      'transmission network',
      'transmission cluster',
      'transmission factors',
      'horizontal transmission',
      'vertical transmission',
      'molecular epidemiology',
      'genetic epidemiology',
      'virus shedding',
      'viral shedding',
      'incubation period',
      'virus isolation',
      'serial interval',
      'reproduction number',
      'reproductive number',
      'R0',
      'case fatality',
      'fatality rate',
      'serosurvey',
      'seroepidemiologic',
      'seroprevalence',
      'attack rate',
      'genetics',
      'prison',
      'prisons',
      'assisted living facilities',
      'assisted living',
      'nursing home',
      'nursing homes',
      'long-term care facility',
      'long-term care facilities',
      'refugee',
      'refugees',
      'detention center',
      'detention centers',
      'detention camp',
      'detention camps',
      'natural history',
      'risk factor',
      'risk factors',
    ],

    [
      'COVID-19',
      'COVID 19',
      'COVID19',
      'COVID2019',
      'COVID 2019',
      'COVID-2019',
      'novel coronavirus',
      'new coronavirus',
      'novel corona virus',
      'new corona virus',
      'SARS-CoV-2',
      'SARSCoV2',
      'SARS-CoV2',
      '2019nCoV',
      '2019-nCoV',
      '2019 coronavirus',
      '2019 corona virus',
      'coronavirus disease 2019',
      'severe acute respiratory syndrome coronavirus 2',
      'sars-coronavirus-2',
      'coronavirus disease 2019',
      'corona virus disease 2019',
      ,
    ],
    ,
  ]
  const nonPharmaceuticalInterventions = [
    [
      'epidemiology',
      'epidemiologic',
      'epidemiological',
      'disease transmission',
      'transmission dynamics',
      'transmission network',
      'transmission cluster',
      'transmission factors',
      'horizontal transmission',
      'vertical transmission',
      'molecular epidemiology',
      'genetic epidemiology',
      'virus shedding',
      'viral shedding',
      'incubation period',
      'virus isolation',
      'serial interval',
      'reproduction number',
      'reproductive number',
      'R0',
      'case fatality',
      'fatality rate',
      'serosurvey',
      'seroepidemiologic',
      'seroprevalence',
      'attack rate',
      'genetics',
      'prison',
      'prisons',
      'assisted living facilities',
      'assisted living',
      'nursing home',
      'nursing homes',
      'long-term care facility',
      'long-term care facilities',
      'refugee',
      'refugees',
      'detention center',
      'detention centers',
      'detention camp',
      'detention camps',
      'natural history',
      'risk factor',
      'risk factors',
    ],

    [
      'COVID-19',
      'COVID 19',
      'COVID19',
      'COVID2019',
      'COVID 2019',
      'COVID-2019',
      'novel coronavirus',
      'new coronavirus',
      'novel corona virus',
      'new corona virus',
      'SARS-CoV-2',
      'SARSCoV2',
      'SARS-CoV2',
      '2019nCoV',
      '2019-nCoV',
      '2019 coronavirus',
      '2019 corona virus',
      'coronavirus disease 2019',
      'severe acute respiratory syndrome coronavirus 2',
      'sars-coronavirus-2',
      'coronavirus disease 2019',
      'corona virus disease 2019',
      ,
      ,
    ],
    ,
    ,
  ]
  const vaccines = [
    [
      'immunotherapy',
      'immunotherapies',
      'immunotherapeutics',
      'vaccines',
      'vaccine',
      'vaccines',
      'vaccination',
    ],

    [
      'COVID-19',
      'COVID 19',
      'COVID19',
      'COVID2019',
      'COVID 2019',
      'COVID-2019',
      'novel coronavirus',
      'new coronavirus',
      'novel corona virus',
      'new corona virus',
      'SARS-CoV-2',
      'SARSCoV2',
      'SARS-CoV2',
      '2019nCoV',
      '2019-nCoV',
      '2019 coronavirus',
      '2019 corona virus',
      'coronavirus disease 2019',
      'severe acute respiratory syndrome coronavirus 2',
      'sars-coronavirus-2',
      'coronavirus disease 2019',
      'corona virus disease 2019',
      ,
    ],
    ,
  ]

  const topics = {
    ecologyAndSpillover,
    vaccines,
    nonPharmaceuticalInterventions,
    epidemiology,
    diagnostics,
    modeling,
    clinicalPresentation,
    pharmaceuticalInterventions,
  }

  const withoutDuplicates = collection.filter(
    ({ rel_doi, version, rel_site }) =>
      currentDOIs.includes(
        `https://${rel_site.toLowerCase()}/${rel_doi}v${version}`,
      ),
  )

  const newManuscripts = withoutDuplicates.map(
    ({ rel_doi, rel_site, version, rel_title, rel_abs }) => {
      const manuscriptTopics = Object.entries(topics)
        .filter(([topicName, topicKeywords]) => {
          return (
            !!topicKeywords[0].filter(keyword =>
              manuscript.rel_abs.includes(keyword),
            ).length &&
            !!topicKeywords[1].filter(keyword =>
              manuscript.rel_abs.includes(keyword),
            ).length
          )
        })
        .map(([topicName]) => topicName)

      return {
        status: 'new',
        submission: {
          articleURL: `https://${rel_site.toLowerCase()}/${rel_doi}v${version}`,
          articleDescription: rel_title,
          abstract: rel_abs,
          topics: manuscriptTopics[0],
        },
      }
    },
  )

  const inserted = await ctx.models.Manuscript.query().insert(newManuscripts)

  return inserted
}

module.exports = getData
