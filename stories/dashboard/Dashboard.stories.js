import React from 'react'
import Dashboard from '../../app/components/component-dashboard/src/components/Dashboard'
import { JournalProvider } from '../../app/components/xpub-journal/src'
import { XpubProvider } from '../../app/components/xpub-with-context/src'
import * as journal from '../../config/journal'

export const Base = args => (
    <XpubProvider>
        <JournalProvider journal={JSON.parse(JSON.stringify(journal))}>
            <Dashboard {...props} />
        </JournalProvider>
    </XpubProvider>
)

const props = {
    "instanceName": "aperture",
    "authorLatestVersions": [
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "589d6e6f-91e7-49f1-bcf3-5c1cb02c67f7",
            "shortId": 15,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "7bcc2346-4062-4ca8-aa18-6d584407df47",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "d321c7b4-7fb3-40c6-9914-9ae08704239b",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": null
                        }
                    ]
                }
            ],
            "status": "accepted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "589d6e6f-91e7-49f1-bcf3-5c1cb02c67f7",
                "title": " re-publishing to Hypothes.is should modify existing annotations",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"https://www.biorxiv.org/content/10.1101/2022.02.27.482137v1\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"\",\"datacode\":\"\",\"objectType\":\"software\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": "2022-03-10T06:33:51.352Z"
        },
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "cb9fffa6-b373-4266-8459-2381632e09f7",
            "shortId": 14,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "41402a1a-f02a-416f-9747-5afcd13dff1c",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "d8bd8819-593a-468c-9085-a67cddc2dd3d",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": null
                        }
                    ]
                }
            ],
            "status": "accepted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "cb9fffa6-b373-4266-8459-2381632e09f7",
                "title": "sample manuscript - text",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"https://www.biorxiv.org/content/10.1101/2022.03.05.483091v1\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"<p class=\\\"paragraph\\\">lorem ipsum dolor sit adispacing</p>\",\"datacode\":\"\",\"objectType\":\"software\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": "2022-03-09T14:08:14.396Z"
        },
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "9e61ffe9-dd16-4f94-8043-df935f0028dd",
            "shortId": 13,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "f445cca1-c779-49d2-83bc-e584128fdb9e",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "e1afb2dd-e626-4cef-89bd-8b5306bfbf5d",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": null
                        }
                    ]
                }
            ],
            "status": "accepted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "9e61ffe9-dd16-4f94-8043-df935f0028dd",
                "title": "my test manuscript changed my test manuscript changed",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"https://www.biorxiv.org/content/10.1101/2022.03.04.483054v1\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"\",\"datacode\":\"\",\"objectType\":\"dataset\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": "2022-03-09T11:40:05.312Z"
        },
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "ce766759-9d06-467e-b30f-c245d2b051f8",
            "shortId": 12,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "fd78c4cf-aaeb-433b-a252-69039d2f9ab8",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "46518e54-3cb3-4ebc-b24d-0715f50c69d3",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": null
                        }
                    ]
                }
            ],
            "status": "new",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "ce766759-9d06-467e-b30f-c245d2b051f8",
                "title": "sample (1)",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"<p class=\\\"paragraph\\\">lorem ipsum dolor sit adi</p>\",\"datacode\":\"\",\"objectType\":\"\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": null
        },
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "ee68da72-9fac-4fe0-bd40-38307aae4770",
            "shortId": 11,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "09bb7c8c-9d02-4a92-a9f9-3b2081f4c91e",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "f6b9fb90-20c0-4e96-92e9-2b6b5f6b5f54",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": null
                        }
                    ]
                }
            ],
            "status": "accepted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "ee68da72-9fac-4fe0-bd40-38307aae4770",
                "title": "sample manuscript",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"https://www.biorxiv.org/content/10.1101/2022.03.05.483129v1\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"\",\"datacode\":\"\",\"objectType\":\"dataset\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": "2022-03-09T05:33:08.939Z"
        },
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "11fa9e87-5b02-48e0-bd3f-68fb86ddccfe",
            "shortId": 10,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "e3f81b2a-71d9-4759-b5a9-52adc052ab70",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "3133b1d7-cf5e-4e0b-8439-97184d583a56",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": null
                        }
                    ]
                }
            ],
            "status": "accepted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "11fa9e87-5b02-48e0-bd3f-68fb86ddccfe",
                "title": "sample (1)",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"https://www.biorxiv.org/content/10.1101/2022.01.24.477483v1\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"\",\"datacode\":\"\",\"objectType\":\"software\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": "2022-03-08T14:21:43.576Z"
        }
    ],
    "reviewerLatestVersions": [
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "19c90a0f-b253-473f-bc16-e6ada5d4fcd8",
            "shortId": 17,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "d7e2e070-af9a-450d-96d3-0ec5ff6b7b0b",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "4df32120-cf65-4b7d-897f-9f954590fb3e",
                            "user": {
                                "__typename": "User",
                                "id": "e60b5b2b-ebb6-46cd-95d5-af9a6b613501",
                                "username": "Shubham  Tiwari"
                            },
                            "status": null
                        }
                    ]
                },
                {
                    "__typename": "Team",
                    "id": "d84b93d4-c71b-4eca-9cb0-11c99026e33d",
                    "role": "reviewer",
                    "name": "Reviewers",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "563b7408-b37b-4da8-880e-17a9f98655ab",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": "accepted"
                        }
                    ]
                }
            ],
            "status": "submitted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "19c90a0f-b253-473f-bc16-e6ada5d4fcd8",
                "title": "sample (1)",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"\",\"datacode\":\"\",\"objectType\":\"software\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": null
        },
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "6cff0e05-f7b3-4900-8230-eabbf5b39529",
            "shortId": 16,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "170bab8f-c4a7-4178-9adc-efa47ad5292f",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "6996f644-1b41-434d-a314-ab9d9cf997fa",
                            "user": {
                                "__typename": "User",
                                "id": "136864cf-0712-4ad8-bdd1-aa34ae2c11ed",
                                "username": "Coloredcow"
                            },
                            "status": null
                        }
                    ]
                },
                {
                    "__typename": "Team",
                    "id": "f7ab103b-c9b0-4e61-9010-37478552dd79",
                    "role": "reviewer",
                    "name": "Reviewers",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "a9b0fcf9-a876-45f1-8551-9a0838e8bd43",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": "completed"
                        }
                    ]
                }
            ],
            "status": "submitted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "6cff0e05-f7b3-4900-8230-eabbf5b39529",
                "title": "sample (1)",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"\",\"datacode\":\"\",\"objectType\":\"software\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": null
        },
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "efa50d18-07eb-456f-bc79-2dd7f4c98a77",
            "shortId": 8,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "6f043a11-c21e-4c17-af8e-e768b2515f1a",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "0826e66d-ab69-4563-8efe-72d7245adbbb",
                            "user": {
                                "__typename": "User",
                                "id": "e60b5b2b-ebb6-46cd-95d5-af9a6b613501",
                                "username": "Shubham  Tiwari"
                            },
                            "status": null
                        }
                    ]
                },
                {
                    "__typename": "Team",
                    "id": "2e135d1e-c56c-46cf-ad44-6b0603112716",
                    "role": "reviewer",
                    "name": "Reviewers",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "ad8cb35b-62d8-4cda-a372-3d837b85c2db",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": "completed"
                        }
                    ]
                }
            ],
            "status": "accepted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "efa50d18-07eb-456f-bc79-2dd7f4c98a77",
                "title": "sample manuscript",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"link\":\"https://www.biorxiv.org/content/10.1101/2022.01.24.477483v1\",\"cover\":\"\",\"title\":\"\",\"topics\":[],\"Funding\":\"\",\"abstract\":\"\",\"datacode\":\"\",\"objectType\":\"\",\"references\":\"\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"\",\"copyrightHolder\":\"\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"\",\"competingInterests\":\"\",\"copyrightStatement\":\"\",\"authorContributions\":\"\",\"AuthorCorrespondence\":\"\"}",
            "published": "2022-03-08T07:50:50.440Z"
        },
        {
            "__typename": "Manuscript",
            "manuscriptVersions": [],
            "id": "bb26fcfd-11fc-49ba-8f04-2bddc0ab5157",
            "shortId": 7,
            "teams": [
                {
                    "__typename": "Team",
                    "id": "41fe9e25-7b0a-45b4-a11f-4922b531bb99",
                    "role": "author",
                    "name": "Author",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "a24f0dca-4dce-487c-bae1-144666f8c8cf",
                            "user": {
                                "__typename": "User",
                                "id": "e60b5b2b-ebb6-46cd-95d5-af9a6b613501",
                                "username": "Shubham  Tiwari"
                            },
                            "status": null
                        }
                    ]
                },
                {
                    "__typename": "Team",
                    "id": "70d23638-cd91-4d5b-8b59-cfbd4fb03b74",
                    "role": "reviewer",
                    "name": "Reviewers",
                    "members": [
                        {
                            "__typename": "TeamMember",
                            "id": "c3925f92-c754-4a4a-87f8-beff1f3cd3f8",
                            "user": {
                                "__typename": "User",
                                "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
                                "username": "Pokhi"
                            },
                            "status": "completed"
                        }
                    ]
                }
            ],
            "status": "accepted",
            "meta": {
                "__typename": "ManuscriptMeta",
                "manuscriptId": "bb26fcfd-11fc-49ba-8f04-2bddc0ab5157",
                "title": "My test manuscript",
                "articleSections": null,
                "articleType": null,
                "history": null
            },
            "submission": "{\"DOI\":\"\",\"cover\":\"<p class=\\\"paragraph\\\">lorem ipsum dolor sit adispacing</p>\",\"title\":\"\",\"topics\":[\"Topic 2\"],\"Funding\":\"lorem ipsum dolor sit adispacing\",\"abstract\":\"<p class=\\\"paragraph\\\">lorem ipsum dolor sit adispacing</p>\",\"datacode\":\"<p class=\\\"paragraph\\\">lorem ipsum dolor sit adispacing</p>\",\"objectType\":\"dataset\",\"references\":\"<p class=\\\"paragraph\\\">lorem ipsum dolor sit adispacing</p>\",\"authorNames\":\"\",\"dateAccepted\":\"\",\"dateReceived\":\"\",\"copyrightYear\":\"\",\"datePublished\":\"\",\"DecisionLetter\":\"<p class=\\\"paragraph\\\">lorem ipsum dolor sit adispacing</p>\",\"copyrightHolder\":\"Indian Journal of Science\",\"reviewingEditor\":\"\",\"EditorsEvaluation\":\"lorem ipsum dolor sit adispacing\",\"competingInterests\":\"<p class=\\\"paragraph\\\">lorem ipsum dolor sit adispacing</p>\",\"copyrightStatement\":\"\",\"authorContributions\":\"lorem ipsum dolor sit adispacing\",\"AuthorCorrespondence\":\"lorem ipsum dolor sit adispacing\"}",
            "published": "2022-03-08T07:51:42.953Z"
        }
    ],
    "currentUser": {
        "__typename": "User",
        "id": "46d6cc04-6310-4021-be5a-5dcf4e24868c",
        "username": "Pokhi",
        "admin": true
    },
    "editorLatestVersions": [],
    "newSubmission": () => alert('Add new submission...'),
    "reviewerRespond": () => alert('Responding as reviewer...'),
}

Base.args = props

export default {
    title: 'Dashboard/Dashboard',
    component: Dashboard,
    argTypes: {},
}
