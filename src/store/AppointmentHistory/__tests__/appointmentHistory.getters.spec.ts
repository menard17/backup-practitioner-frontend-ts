import { appointments } from "@/store/AppointmentHistory/appointmentHistory.getters";

describe("get appointments history", () => {
  const state = {
    appointments: [
      {
        id: "ed27c651-90a8-43ee-9276-da01157bd560",
        meta: {
          lastUpdated: "2022-11-08T02:40:03.297926+00:00",
          versionId: "MTY2Nzg3NTIwMzI5NzkyNjAwMA",
        },
        appointmentType: {
          coding: [
            {
              code: "FOLLOWUP",
              display: "A follow up visit from a previous appointment",
              system: "http://terminology.hl7.org/CodeSystem/v2-0276",
            },
          ],
        },
        description: "Booking practitioner role",
        end: "2022-11-09T00:25:00-06:00",
        participant: [
          {
            actor: {
              reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
            },
            required: "required",
            status: "accepted",
          },
          {
            actor: {
              reference:
                "PractitionerRole/44081d2d-c593-4185-8a41-dee5bed240ce",
            },
            required: "required",
            status: "accepted",
          },
        ],
        serviceCategory: [
          {
            coding: [
              {
                code: "17",
                display: "General Practice",
                system: "http://hl7.org/fhir/codesystem-service-category.html",
              },
            ],
          },
        ],
        serviceType: [
          {
            coding: [
              {
                code: "540",
                display: "Online Service",
                system: "http://hl7.org/fhir/valueset-service-type.html",
              },
            ],
          },
        ],
        slot: [
          {
            reference: "Slot/8f47f0a8-b564-49d8-a414-8fe924f0eb29",
          },
        ],
        start: "2022-11-09T00:10:00-06:00",
        status: "fulfilled",
        resourceType: "Appointment",
        practitioner: {
          id: "d6b5b841-c180-490a-834c-c54adeec071b",
          meta: {
            lastUpdated: "2022-11-08T02:39:10.596413+00:00",
            versionId: "MTY2Nzg3NTE1MDU5NjQxMzAwMA",
          },

          name: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/iso21090-EN-representation",
                  valueString: "ABC",
                },
              ],
              family: "Test ",
              given: ["Uzir EN"],
              prefix: ["MD"],
              text: "Uzir EN Test ",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/iso21090-EN-representation",
                  valueString: "IDE",
                },
              ],
              family: "Test",
              given: ["Uzir JP"],
              prefix: ["医師"],
              text: "Uzir JP Test",
            },
          ],

          resourceType: "Practitioner",
        },
        patient: {
          id: "d2d38e2b-bc1a-49df-b561-fded028cf918",
          meta: {
            lastUpdated: "2022-11-08T02:22:03.420486+00:00",
            versionId: "MTY2Nzg3NDEyMzQyMDQ4NjAwMA",
          },

          name: [
            {
              family: "Uzir",
              given: ["Thapa"],
              use: "official",
            },
          ],

          resourceType: "Patient",
        },
      },
      {
        id: "9a065b7f-8da0-4c0d-ae22-fa2f97b342ba",
        meta: {
          lastUpdated: "2022-11-09T01:23:29.282014+00:00",
          versionId: "MTY2Nzk1NzAwOTI4MjAxNDAwMA",
        },
        appointmentType: {
          coding: [
            {
              code: "FOLLOWUP",
              display: "A follow up visit from a previous appointment",
              system: "http://terminology.hl7.org/CodeSystem/v2-0276",
            },
          ],
        },
        description: "Booking practitioner role",
        end: "2022-11-09T02:25:00-06:00",
        participant: [
          {
            actor: {
              reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
            },
            required: "required",
            status: "accepted",
          },
          {
            actor: {
              reference:
                "PractitionerRole/44081d2d-c593-4185-8a41-dee5bed240ce",
            },
            required: "required",
            status: "accepted",
          },
        ],
        serviceCategory: [
          {
            coding: [
              {
                code: "17",
                display: "General Practice",
                system: "http://hl7.org/fhir/codesystem-service-category.html",
              },
            ],
          },
        ],
        serviceType: [
          {
            coding: [
              {
                code: "540",
                display: "Online Service",
                system: "http://hl7.org/fhir/valueset-service-type.html",
              },
            ],
          },
        ],
        slot: [
          {
            reference: "Slot/9be63d9c-171a-467c-9f14-7aa01fb91bf5",
          },
        ],
        start: "2022-11-09T02:10:00-06:00",
        status: "booked",
        resourceType: "Appointment",
        practitioner: {
          id: "d6b5b841-c180-490a-834c-c54adeec071b",
          meta: {
            lastUpdated: "2022-11-08T02:39:10.596413+00:00",
            versionId: "MTY2Nzg3NTE1MDU5NjQxMzAwMA",
          },

          name: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/iso21090-EN-representation",
                  valueString: "ABC",
                },
              ],
              family: "Test ",
              given: ["Uzir EN"],
              prefix: ["MD"],
              text: "Uzir EN Test ",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/iso21090-EN-representation",
                  valueString: "IDE",
                },
              ],
              family: "Test",
              given: ["Uzir JP"],
              prefix: ["医師"],
              text: "Uzir JP Test",
            },
          ],

          resourceType: "Practitioner",
        },
        patient: {
          id: "d2d38e2b-bc1a-49df-b561-fded028cf918",
          meta: {
            lastUpdated: "2022-11-08T02:22:03.420486+00:00",
            versionId: "MTY2Nzg3NDEyMzQyMDQ4NjAwMA",
          },

          name: [
            {
              family: "Uzir",
              given: ["Thapa"],
              use: "official",
            },
          ],

          resourceType: "Patient",
        },
      },
      {
        id: "83cdbb96-b849-4465-921d-4690b0c9e9b0",
        meta: {
          lastUpdated: "2022-11-09T01:23:54.186970+00:00",
          versionId: "MTY2Nzk1NzAzNDE4Njk3MDAwMA",
        },
        appointmentType: {
          coding: [
            {
              code: "FOLLOWUP",
              display: "A follow up visit from a previous appointment",
              system: "http://terminology.hl7.org/CodeSystem/v2-0276",
            },
          ],
        },
        description: "Booking practitioner role",
        end: "2022-11-10T13:20:00-06:00",
        participant: [
          {
            actor: {
              reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
            },
            required: "required",
            status: "accepted",
          },
          {
            actor: {
              reference:
                "PractitionerRole/44081d2d-c593-4185-8a41-dee5bed240ce",
            },
            required: "required",
            status: "accepted",
          },
        ],
        serviceCategory: [
          {
            coding: [
              {
                code: "17",
                display: "General Practice",
                system: "http://hl7.org/fhir/codesystem-service-category.html",
              },
            ],
          },
        ],
        serviceType: [
          {
            coding: [
              {
                code: "540",
                display: "Online Service",
                system: "http://hl7.org/fhir/valueset-service-type.html",
              },
            ],
          },
        ],
        slot: [
          {
            reference: "Slot/8c93c074-0763-4cac-b474-6a00b02d07a5",
          },
        ],
        start: "2022-11-10T13:05:00-06:00",
        status: "fulfilled",
        resourceType: "Appointment",
        practitioner: {
          id: "d6b5b841-c180-490a-834c-c54adeec071b",
          meta: {
            lastUpdated: "2022-11-08T02:39:10.596413+00:00",
            versionId: "MTY2Nzg3NTE1MDU5NjQxMzAwMA",
          },

          name: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/iso21090-EN-representation",
                  valueString: "ABC",
                },
              ],
              family: "Test ",
              given: ["Uzir EN"],
              prefix: ["MD"],
              text: "Uzir EN Test ",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/iso21090-EN-representation",
                  valueString: "IDE",
                },
              ],
              family: "Test",
              given: ["Uzir JP"],
              prefix: ["医師"],
              text: "Uzir JP Test",
            },
          ],

          resourceType: "Practitioner",
        },
        patient: {
          id: "d2d38e2b-bc1a-49df-b561-fded028cf918",
          meta: {
            lastUpdated: "2022-11-08T02:22:03.420486+00:00",
            versionId: "MTY2Nzg3NDEyMzQyMDQ4NjAwMA",
          },

          name: [
            {
              family: "Uzir",
              given: ["Thapa"],
              use: "official",
            },
          ],
          resourceType: "Patient",
        },
      },
    ],
    encounters: [
      {
        id: "9bbc4dd6-e906-42a0-a0f9-8b3315d0aa9c",
        meta: {
          lastUpdated: "2022-11-09 01:23:53.998851+00:00",
          versionId: "MTY2Nzk1NzAzMzk5ODg1MTAwMA",
        },
        account: [
          {
            reference: "Account/aaae6973-f12d-4b16-a198-636b14b7bb77",
          },
        ],
        appointment: [
          {
            reference: "Appointment/83cdbb96-b849-4465-921d-4690b0c9e9b0",
          },
        ],
        class: {
          code: "HH",
          display: "home health",
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        },
        participant: [
          {
            individual: {
              reference:
                "PractitionerRole/44081d2d-c593-4185-8a41-dee5bed240ce",
            },
          },
        ],
        status: "in-progress",
        subject: {
          reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
        },
        resourceType: "Encounter",
      },
    ],
    medications: [
      {
        id: "1aa850e4-d002-4c8a-9634-6f8ff0ce19a8",
        meta: {
          lastUpdated: "2022-11-09 01:24:36.214916+00:00",
          versionId: "MTY2Nzk1NzA3NjIxNDkxNjAwMA",
        },
        encounter: {
          reference: "Encounter/9bbc4dd6-e906-42a0-a0f9-8b3315d0aa9c",
        },
        intent: "order",
        medicationCodeableConcept: {
          coding: [
            {
              code: "Loxonin tablet",
              display: "ロキソニン&セルベックス錠剤",
            },
          ],
        },
        priority: "urgent",
        requester: {
          reference: "PractitionerRole/44081d2d-c593-4185-8a41-dee5bed240ce",
        },
        status: "completed",
        subject: {
          reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
        },
        resourceType: "MedicationRequest",
      },
    ],
    tests: [
      {
        id: "7adf5f38-c352-4f39-a7f7-620b52486a4a",
        meta: {
          lastUpdated: "2022-11-09 01:24:36.305000+00:00",
          versionId: "MTY2Nzk1NzA3NjMwNTAwMDAwMA",
        },
        code: {
          coding: [
            {
              code: "Allplex SARS-CoV-2 Assay",
              display: "PCR検査施行",
              system: "ServiceRequest",
            },
          ],
        },
        encounter: {
          reference: "Encounter/9bbc4dd6-e906-42a0-a0f9-8b3315d0aa9c",
        },
        intent: "order",
        priority: "urgent",
        requester: {
          reference: "PractitionerRole/44081d2d-c593-4185-8a41-dee5bed240ce",
        },
        status: "completed",
        subject: {
          reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
        },
        resourceType: "ServiceRequest",
      },
    ],
  };

  const getters = {};
  const rootState = {
    $_patients: {
      documentReferences: [
        {
          id: "17903bad-6ca2-481f-a369-dcc44720d69b",
          meta: {
            lastUpdated: "2022-11-09 01:24:36.210365+00:00",
            versionId: "MTY2Nzk1NzA3NjIxMDM2NTAwMA",
          },
          category: [
            {
              coding: [
                {
                  code: "clinical-note",
                  display: "Clinical Note",
                  system:
                    "http://fhir.org/guides/argonaut-clinicalnotes/CodeSystem/documentreference-category",
                },
              ],
            },
          ],
          content: [
            {
              attachment: {
                contentType: "text/xml;charset=utf-8",
                creation: "2022-11-09 01:24:35.932724+00:00",
                data: "5ouF5b2T5Yy75bir77yaCgrjgJDln7rmnKzmg4XloLHjgJEKIOaCo+iAheWQje+8iOeiuuiqjeOBruOBn+OCgeiqreOBv+S7ruWQjeOCkuWPs+OBq+iomOi8ieOBj+OBoOOBleOBhO+8ie+8mgoKIOKAu+iouuWvn+mWi+Wni+WJjeOBq+S7peS4i+OCkuWPo+mgreOBp+iqrOaYjuOBl++9pOWQjOaEj+OCkuW+l+OBpuOBhOOBn+OBoOOBj+OCiOOBhuOBiumhmOOBhOOBl+OBvuOBme+9oQrjg7vop6boqLrnrYnjgpLooYzjgYbjgZPjgajjgYzjgafjgY3jgarjgYTnrYnjga7nkIbnlLHjgavjgojjgorjgIHjgqrjg7Pjg6njgqTjg7PoqLrnmYLjgaflvpfjgonjgozjgosg5oOF5aCx44Gv6ZmQ44KJ44KM44Gm44GE44KL44GT44GoCuODu+WgtOWQiOOBq+OCiOOBo+OBpuOBr+WvvumdouiouueZguOCkue1hOOBv+WQiOOCj+OBm+OCi+W/heimgeOBjOOBguOCi+OBk+OBqAoK44CQ54++55eF5q2044CRCueXh+eKtuKGkuS7peS4i+OBp+ipsuW9k+OBmeOCi+eXh+eKtuOBruOBv+OCkuOCq+ODq+ODhuOBq+aui+OBl+OAgeOBneOCjOS7peWkluOBrueXh+eKtuOBr+WJiumZpOOBl+OBpuOBj+OBoOOBleOBhOOAgu+8iOKAu+eZuueXh+aXpeOBr+W/heOBmuiomOi8ieOBl+OBpuaui+OBl+OBpuOBj+OBoOOBleOBhO+8iQoK55m654axOgrlkrM6CuWSs+S7peWkluOBruaApeaAp+WRvOWQuOWZqOeXh+eKtjoK6IK654KO5YOPOgrph43nr6Tjgarogrrngo46CuaApeaAp+WRvOWQuOeqrui/q+eXh+WAmee+pDoK5aSa6IeT5Zmo5LiN5YWoOgrlhajouqvlgKbmgKDmhJ86CumgreeXm146CuWYlOawly/lmJTlkJA6CuS4i+eXojoK57WQ6Iac54KOOgrll4Xopprjg7vlkbPopprpmpzlrrM6CuWSvemgreeXmzoK44Gd44Gu5LuWOgrnmbrnl4fml6XvvJoKCuOAkOaXouW+gOattOOAkQoK44CQ5YaF5pyN44CRCgrjgJDllqvnhZnmrbTjgJEKCuOAkOOCouODrOODq+OCruODvOOAkQoK44CQ44Gd44Gu5LuW77yI6Zm95oCn5pmC772k55m655Sf5bGK44KS5Ye644GZ44Gr44GC44Gf44Gj44Gm5b+F6KaB44Gq5oOF5aCx77yJ44CRCiDjg6/jgq/jg4Hjg7PmjqXnqK7mrbTvvIjlm57mlbDvvInvvJoKCiAj44Kz44Ot44OK44Km44Kk44Or44K544Gu55aR44GECiBQQ1LmpJzmn7vmlr3ooYwKIOWPs+iomOWHpuaWuQog54++5q616ZqO44Gn5YWl6Zmi6YGp5b+c44Gq44GXCiDjgb7jgZ/jgIHku6XkuIvjgavplqLjgZfjgablkIzmhI/jgpLlvpfjgZ/jgIIKIOODu+e1kOaenOmAmuefpeOBr+e/jOaXpTE45pmC6aCD44Oh44O844Or44Gn6KGM44GG44GT44GoCiDjg7vpmb3mgKfjgaDjgaPjgZ/loLTlkIjjgIHnl4fnirbnmbrnl4fml6XjgpIw5pel55uu44Go44GX44GmN+aXpeebruOBvuOBp+OBruiHquWuhemalOmbogog44O744Gd44Gu6ZaT44CB5L+d5YGl5omA44Gr44GL44KP44Gj44Gm5b2T6Zmi44GM5YGl5bq36Kaz5a+f44KS6KGM44GG44GT44GoCiDjg7vpmb3mgKfpgJrnn6Xjg6Hjg7zjg6vjgpLlj5fjgZHlj5bjgaPjgZ/mrrXpmo7jgafjgIHnl4Xnirbjga7okZfjgZfjgYTlpInljJbjgYzjgYLjgaPjgZ/loLTlkIjjga/jgZTpgKPntaHjgY/jgaDjgZXjgYTjgII=",
                title: "page1",
              },
            },
          ],
          context: {
            encounter: [
              {
                reference: "Encounter/9bbc4dd6-e906-42a0-a0f9-8b3315d0aa9c",
              },
            ],
          },
          date: "2022-11-09 01:24:35.932729+00:00",
          status: "current",
          subject: {
            reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
          },
          type: {
            coding: [
              {
                code: "55110-1",
                display: "Conclusions Document",
                system: "http://loinc.org",
              },
            ],
          },
          resourceType: "DocumentReference",
        },
        {
          id: "c5253d84-ae49-4480-bc54-aa8666cdce1a",
          meta: {
            lastUpdated: "2022-11-08 02:41:13.716765+00:00",
            versionId: "MTY2Nzg3NTI3MzcxNjc2NTAwMA",
          },
          category: [
            {
              coding: [
                {
                  code: "clinical-note",
                  display: "Clinical Note",
                  system:
                    "http://fhir.org/guides/argonaut-clinicalnotes/CodeSystem/documentreference-category",
                },
              ],
            },
          ],
          content: [
            {
              attachment: {
                contentType: "text/xml;charset=utf-8",
                creation: "2022-11-08 02:41:13.259625+00:00",
                data: "5ouF5b2T5Yy75bir77yaCgrjgJDln7rmnKzmg4XloLHjgJEKIOaCo+iAheWQje+8iOeiuuiqjeOBruOBn+OCgeiqreOBv+S7ruWQjeOCkuWPs+OBq+iomOi8ieOBj+OBoOOBleOBhO+8ie+8mgoKIOKAu+iouuWvn+mWi+Wni+WJjeOBq+S7peS4i+OCkuWPo+mgreOBp+iqrOaYjuOBl++9pOWQjOaEj+OCkuW+l+OBpuOBhOOBn+OBoOOBj+OCiOOBhuOBiumhmOOBhOOBl+OBvuOBme+9oQrjg7vop6boqLrnrYnjgpLooYzjgYbjgZPjgajjgYzjgafjgY3jgarjgYTnrYnjga7nkIbnlLHjgavjgojjgorjgIHjgqrjg7Pjg6njgqTjg7PoqLrnmYLjgaflvpfjgonjgozjgosg5oOF5aCx44Gv6ZmQ44KJ44KM44Gm44GE44KL44GT44GoCuODu+WgtOWQiOOBq+OCiOOBo+OBpuOBr+WvvumdouiouueZguOCkue1hOOBv+WQiOOCj+OBm+OCi+W/heimgeOBjOOBguOCi+OBk+OBqAoK44CQ54++55eF5q2044CRCueXh+eKtuKGkuS7peS4i+OBp+ipsuW9k+OBmeOCi+eXh+eKtuOBruOBv+OCkuOCq+ODq+ODhuOBq+aui+OBl+OAgeOBneOCjOS7peWkluOBrueXh+eKtuOBr+WJiumZpOOBl+OBpuOBj+OBoOOBleOBhOOAgu+8iOKAu+eZuueXh+aXpeOBr+W/heOBmuiomOi8ieOBl+OBpuaui+OBl+OBpuOBj+OBoOOBleOBhO+8iQoK55m654axOgrlkrM6CuWSs+S7peWkluOBruaApeaAp+WRvOWQuOWZqOeXh+eKtjoK6IK654KO5YOPOgrph43nr6Tjgarogrrngo46CuaApeaAp+WRvOWQuOeqrui/q+eXh+WAmee+pDoK5aSa6IeT5Zmo5LiN5YWoOgrlhajouqvlgKbmgKDmhJ86CumgreeXm146CuWYlOawly/lmJTlkJA6CuS4i+eXojoK57WQ6Iac54KOOgrll4Xopprjg7vlkbPopprpmpzlrrM6CuWSvemgreeXmzoK44Gd44Gu5LuWOgrnmbrnl4fml6XvvJoKCuOAkOaXouW+gOattOOAkQoK44CQ5YaF5pyN44CRCgrjgJDllqvnhZnmrbTjgJEKCuOAkOOCouODrOODq+OCruODvOOAkQoK44CQ44Gd44Gu5LuW77yI6Zm95oCn5pmC772k55m655Sf5bGK44KS5Ye644GZ44Gr44GC44Gf44Gj44Gm5b+F6KaB44Gq5oOF5aCx77yJ44CRCiDjg6/jgq/jg4Hjg7PmjqXnqK7mrbTvvIjlm57mlbDvvInvvJoKCiAj44Kz44Ot44OK44Km44Kk44Or44K544Gu55aR44GECiBQQ1LmpJzmn7vmlr3ooYwKIOWPs+iomOWHpuaWuQog54++5q616ZqO44Gn5YWl6Zmi6YGp5b+c44Gq44GXCiDjgb7jgZ/jgIHku6XkuIvjgavplqLjgZfjgablkIzmhI/jgpLlvpfjgZ/jgIIKIOODu+e1kOaenOmAmuefpeOBr+e/jOaXpTE45pmC6aCD44Oh44O844Or44Gn6KGM44GG44GT44GoCiDjg7vpmb3mgKfjgaDjgaPjgZ/loLTlkIjjgIHnl4fnirbnmbrnl4fml6XjgpIw5pel55uu44Go44GX44GmN+aXpeebruOBvuOBp+OBruiHquWuhemalOmbogog44O744Gd44Gu6ZaT44CB5L+d5YGl5omA44Gr44GL44KP44Gj44Gm5b2T6Zmi44GM5YGl5bq36Kaz5a+f44KS6KGM44GG44GT44GoCiDjg7vpmb3mgKfpgJrnn6Xjg6Hjg7zjg6vjgpLlj5fjgZHlj5bjgaPjgZ/mrrXpmo7jgafjgIHnl4Xnirbjga7okZfjgZfjgYTlpInljJbjgYzjgYLjgaPjgZ/loLTlkIjjga/jgZTpgKPntaHjgY/jgaDjgZXjgYTjgII=",
                title: "page1",
              },
            },
          ],
          context: {
            encounter: [
              {
                reference: "Encounter/10ff4869-8a3f-4131-b612-4a9846952ffa",
              },
            ],
          },
          date: "2022-11-08 02:41:13.259630+00:00",
          status: "current",
          subject: {
            reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
          },
          type: {
            coding: [
              {
                code: "55110-1",
                display: "Conclusions Document",
                system: "http://loinc.org",
              },
            ],
          },
          resourceType: "DocumentReference",
        },
        {
          id: "06536088-4007-4870-94b8-d5aefb4769dc",
          meta: {
            lastUpdated: "2022-10-17 10:06:01.172502+00:00",
            versionId: "MTY2NjAwMTE2MTE3MjUwMjAwMA",
          },
          category: [
            {
              coding: [
                {
                  code: "clinical-note",
                  display: "Clinical Note",
                  system:
                    "http://fhir.org/guides/argonaut-clinicalnotes/CodeSystem/documentreference-category",
                },
              ],
            },
          ],
          content: [
            {
              attachment: {
                contentType: "text/xml;charset=utf-8",
                creation: "2022-10-17 10:06:00.527085+00:00",
                data: "5ouF5b2T5Yy75bir77yaCgrjgJDln7rmnKzmg4XloLHjgJEKIOaCo+iAheWQje+8iOeiuuiqjeOBruOBn+OCgeiqreOBv+S7ruWQjeOCkuWPs+OBq+iomOi8ieOBj+OBoOOBleOBhO+8ie+8mgoKIOKAu+iouuWvn+mWi+Wni+WJjeOBq+S7peS4i+OCkuWPo+mgreOBp+iqrOaYjuOBl++9pOWQjOaEj+OCkuW+l+OBpuOBhOOBn+OBoOOBj+OCiOOBhuOBiumhmOOBhOOBl+OBvuOBme+9oQrjg7vop6boqLrnrYnjgpLooYzjgYbjgZPjgajjgYzjgafjgY3jgarjgYTnrYnjga7nkIbnlLHjgavjgojjgorjgIHjgqrjg7Pjg6njgqTjg7PoqLrnmYLjgaflvpfjgonjgozjgosg5oOF5aCx44Gv6ZmQ44KJ44KM44Gm44GE44KL44GT44GoCuODu+WgtOWQiOOBq+OCiOOBo+OBpuOBr+WvvumdouiouueZguOCkue1hOOBv+WQiOOCj+OBm+OCi+W/heimgeOBjOOBguOCi+OBk+OBqAoK44CQ54++55eF5q2044CRCueXh+eKtuKGkuS7peS4i+OBp+ipsuW9k+OBmeOCi+eXh+eKtuOBruOBv+OCkuOCq+ODq+ODhuOBq+aui+OBl+OAgeOBneOCjOS7peWkluOBrueXh+eKtuOBr+WJiumZpOOBl+OBpuOBj+OBoOOBleOBhOOAgu+8iOKAu+eZuueXh+aXpeOBr+W/heOBmuiomOi8ieOBl+OBpuaui+OBl+OBpuOBj+OBoOOBleOBhO+8iQoK55m654axOgrlkrM6CuWSs+S7peWkluOBruaApeaAp+WRvOWQuOWZqOeXh+eKtjoK6IK654KO5YOPOgrph43nr6Tjgarogrrngo46CuaApeaAp+WRvOWQuOeqrui/q+eXh+WAmee+pDoK5aSa6IeT5Zmo5LiN5YWoOgrlhajouqvlgKbmgKDmhJ86CumgreeXm146CuWYlOawly/lmJTlkJA6CuS4i+eXojoK57WQ6Iac54KOOgrll4Xopprjg7vlkbPopprpmpzlrrM6CuWSvemgreeXmzoK44Gd44Gu5LuWOgrnmbrnl4fml6XvvJoKCuOAkOaXouW+gOattOOAkQoK44CQ5YaF5pyN44CRCgrjgJDllqvnhZnmrbTjgJEKCuOAkOOCouODrOODq+OCruODvOOAkQoK44CQ44Gd44Gu5LuW77yI6Zm95oCn5pmC772k55m655Sf5bGK44KS5Ye644GZ44Gr44GC44Gf44Gj44Gm5b+F6KaB44Gq5oOF5aCx77yJ44CRCiDjg6/jgq/jg4Hjg7PmjqXnqK7mrbTvvIjlm57mlbDvvInvvJoKCiAj44Kz44Ot44OK44Km44Kk44Or44K544Gu55aR44GECiBQQ1LmpJzmn7vmlr3ooYwKIOWPs+iomOWHpuaWuQog54++5q616ZqO44Gn5YWl6Zmi6YGp5b+c44Gq44GXCiDjgb7jgZ/jgIHku6XkuIvjgavplqLjgZfjgablkIzmhI/jgpLlvpfjgZ/jgIIKIOODu+e1kOaenOmAmuefpeOBr+e/jOaXpTE45pmC6aCD44Oh44O844Or44Gn6KGM44GG44GT44GoCiDjg7vpmb3mgKfjgaDjgaPjgZ/loLTlkIjjgIHnl4fnirbnmbrnl4fml6XjgpIw5pel55uu44Go44GX44GmN+aXpeebruOBvuOBp+OBruiHquWuhemalOmbogog44O744Gd44Gu6ZaT44CB5L+d5YGl5omA44Gr44GL44KP44Gj44Gm5b2T6Zmi44GM5YGl5bq36Kaz5a+f44KS6KGM44GG44GT44GoCiDjg7vpmb3mgKfpgJrnn6Xjg6Hjg7zjg6vjgpLlj5fjgZHlj5bjgaPjgZ/mrrXpmo7jgafjgIHnl4Xnirbjga7okZfjgZfjgYTlpInljJbjgYzjgYLjgaPjgZ/loLTlkIjjga/jgZTpgKPntaHjgY/jgaDjgZXjgYTjgII=",
                title: "page1",
              },
            },
          ],
          context: {
            encounter: [
              {
                reference: "Encounter/dc771dc9-b439-4fab-8570-797e103e5ad9",
              },
            ],
          },
          date: "2022-10-17 10:06:00.527090+00:00",
          status: "current",
          subject: {
            reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
          },
          type: {
            coding: [
              {
                code: "55110-1",
                display: "Conclusions Document",
                system: "http://loinc.org",
              },
            ],
          },
          resourceType: "DocumentReference",
        },
        {
          id: "bc1d51ea-6433-41ea-a871-b757874ebff1",
          meta: {
            lastUpdated: "2022-09-29 12:11:24.365154+00:00",
            versionId: "MTY2NDQ1MzQ4NDM2NTE1NDAwMA",
          },
          category: [
            {
              coding: [
                {
                  code: "clinical-note",
                  display: "Clinical Note",
                  system:
                    "http://fhir.org/guides/argonaut-clinicalnotes/CodeSystem/documentreference-category",
                },
              ],
            },
          ],
          content: [
            {
              attachment: {
                contentType: "text/xml;charset=utf-8",
                creation: "2022-09-29 12:11:24.002150+00:00",
                data: "44OG44K544OI",
                title: "page1",
              },
            },
          ],
          context: {
            encounter: [
              {
                reference: "Encounter/38e15594-b9e8-4026-8b3d-a7904b8c3946",
              },
            ],
          },
          date: "2022-09-29 12:11:24.002155+00:00",
          status: "current",
          subject: {
            reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
          },
          type: {
            coding: [
              {
                code: "55110-1",
                display: "Conclusions Document",
                system: "http://loinc.org",
              },
            ],
          },
          resourceType: "DocumentReference",
        },
        {
          id: "22077b69-f11f-4861-a252-bf737a5a899e",
          meta: {
            lastUpdated: "2022-09-28 03:30:42.645094+00:00",
            versionId: "MTY2NDMzNTg0MjY0NTA5NDAwMA",
          },
          category: [
            {
              coding: [
                {
                  code: "clinical-note",
                  display: "Clinical Note",
                  system:
                    "http://fhir.org/guides/argonaut-clinicalnotes/CodeSystem/documentreference-category",
                },
              ],
            },
          ],
          content: [
            {
              attachment: {
                contentType: "text/xml;charset=utf-8",
                creation: "2022-09-28 03:30:42.403843+00:00",
                data: "5ouF5b2T5Yy75bir77yaCgrjgJDln7rmnKzmg4XloLHjgJEKCuiCuueCjuWDjzoK6YeN56+k44Gq6IK654KOOgrmgKXmgKflkbzlkLjnqq7ov6vnl4flgJnnvqQ6CuWkmuiHk+WZqOS4jeWFqDoK5YWo6Lqr5YCm5oCg5oSfOgrpoK3nl5teOgrlmJTmsJcv5ZiU5ZCQOgrkuIvnl6I6Cue1kOiGnOeCjjoK5ZeF6Kaa44O75ZGz6Kaa6Zqc5a6zOgrlkr3poK3nl5s6CuOBneOBruS7ljoK55m655eH5pel77yaCgrjgJDml6LlvoDmrbTjgJEKCuOAkOWGheacjeOAkQoK44CQ5Zar54WZ5q2044CRCgrjgJDjgqLjg6zjg6vjgq7jg7zjgJEKCuOAkOOBneOBruS7lu+8iOmZveaAp+aZgu+9pOeZuueUn+WxiuOCkuWHuuOBmeOBq+OBguOBn+OBo+OBpuW/heimgeOBquaDheWgse+8ieOAkQog44Ov44Kv44OB44Oz5o6l56iu5q2077yI5Zue5pWw77yJ77yaCgogI+OCs+ODreODiuOCpuOCpOODq+OCueOBrueWkeOBhAogUENS5qSc5p+75pa96KGMCiDlj7PoqJjlh6bmlrkKIOePvuautemajuOBp+WFpemZoumBqeW/nOOBquOBlwog44G+44Gf44CB5Lul5LiL44Gr6Zai44GX44Gm5ZCM5oSP44KS5b6X44Gf44CCCiDjg7vntZDmnpzpgJrnn6Xjga/nv4zml6UxOOaZgumgg+ODoeODvOODq+OBp+ihjOOBhuOBk+OBqAog44O76Zm95oCn44Gg44Gj44Gf5aC05ZCI44CB55eH54q255m655eH5pel44KSMOaXpeebruOBqOOBl+OBpjfml6Xnm67jgb7jgafjga7oh6rlroXpmpTpm6IKIOODu+OBneOBrumWk+OAgeS/neWBpeaJgOOBq+OBi+OCj+OBo+OBpuW9k+mZouOBjOWBpeW6t+ims+Wvn+OCkuihjOOBhuOBk+OBqAog44O76Zm95oCn6YCa55+l44Oh44O844Or44KS5Y+X44GR5Y+W44Gj44Gf5q616ZqO44Gn44CB55eF54q244Gu6JGX44GX44GE5aSJ5YyW44GM44GC44Gj44Gf5aC05ZCI44Gv44GU6YCj57Wh44GP44Gg44GV44GE44CC",
                title: "page1",
              },
            },
          ],
          context: {
            encounter: [
              {
                reference: "Encounter/5c986328-eb55-48bf-b070-e4cea89edbe3",
              },
            ],
          },
          date: "2022-09-28 03:30:42.403848+00:00",
          status: "current",
          subject: {
            reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
          },
          type: {
            coding: [
              {
                code: "55110-1",
                display: "Conclusions Document",
                system: "http://loinc.org",
              },
            ],
          },
          resourceType: "DocumentReference",
        },
        {
          id: "67f48355-67d4-407a-a363-6c5e192f4ae1",
          meta: {
            lastUpdated: "2022-09-22 00:10:08.111968+00:00",
            versionId: "MTY2MzgwNTQwODExMTk2ODAwMA",
          },
          category: [
            {
              coding: [
                {
                  code: "clinical-note",
                  display: "Clinical Note",
                  system:
                    "http://fhir.org/guides/argonaut-clinicalnotes/CodeSystem/documentreference-category",
                },
              ],
            },
          ],
          content: [
            {
              attachment: {
                contentType: "text/xml;charset=utf-8",
                creation: "2022-09-22 00:10:07.828266+00:00",
                data: "5ouF5b2T5Yy75bir77yaCgrjgJDln7rmnKzmg4XloLHjgJEKIOaCo+iAheWQje+8iOeiuuiqjeOBruOBn+OCgeiqreOBv+S7ruWQjeOCkuWPs+OBq+iomOi8ieOBj+OBoOOBleOBhO+8ie+8mgoKIOKAu+iouuWvn+mWi+Wni+WJjeOBq+S7peS4i+OCkuWPo+mgreOBp+iqrOaYjuOBl++9pOWQjOaEj+OCkuW+l+OBpuOBhOOBn+OBoOOBj+OCiOOBhuOBiumhmOOBhOOBl+OBvuOBme+9oQrjg7vop6boqLrnrYnjgpLooYzjgYbjgZPjgajjgYzjgafjgY3jgarjgYTnrYnjga7nkIbnlLHjgavjgojjgorjgIHjgqrjg7Pjg6njgqTjg7PoqLrnmYLjgaflvpfjgonjgozjgosg5oOF5aCx44Gv6ZmQ44KJ44KM44Gm44GE44KL44GT44GoCuODu+WgtOWQiOOBq+OCiOOBo+OBpuOBr+WvvumdouiouueZguOCkue1hOOBv+WQiOOCj+OBm+OCi+W/heimgeOBjOOBguOCi+OBk+OBqAoK44CQ54++55eF5q2044CRCueXh+eKtuKGkuS7peS4i+OBp+ipsuW9k+OBmeOCi+eXh+eKtuOBruOBv+OCkuOCq+ODq+ODhuOBq+aui+OBl+OAgeOBneOCjOS7peWkluOBrueXh+eKtuOBr+WJiumZpOOBl+OBpuOBj+OBoOOBleOBhOOAgu+8iOKAu+eZuueXh+aXpeOBr+W/heOBmuiomOi8ieOBl+OBpuaui+OBl+OBpuOBj+OBoOOBleOBhO+8iQoK55m654axOgrlkrM6CuWSs+S7peWkluOBruaApeaAp+WRvOWQuOWZqOeXh+eKtjoK6IK654KO5YOPOgrph43nr6Tjgarogrrngo46CuaApeaAp+WRvOWQuOeqrui/q+eXh+WAmee+pDoK5aSa6IeT5Zmo5LiN5YWoOgrlhajouqvlgKbmgKDmhJ86CumgreeXm146CuWYlOawly/lmJTlkJA6CuS4i+eXojoK57WQ6Iac54KOOgrll4Xopprjg7vlkbPopprpmpzlrrM6CuWSvemgreeXmzoK44Gd44Gu5LuWOgrnmbrnl4fml6XvvJoKCuOAkOaXouW+gOattOOAkQoK44CQ5YaF5pyN44CRCgrjgJDllqvnhZnmrbTjgJEKCuOAkOOCouODrOODq+OCruODvOOAkQoK44CQ44Gd44Gu5LuW77yI6Zm95oCn5pmC772k55m655Sf5bGK44KS5Ye644GZ44Gr44GC44Gf44Gj44Gm5b+F6KaB44Gq5oOF5aCx77yJ44CRCiDjg6/jgq/jg4Hjg7PmjqXnqK7mrbTvvIjlm57mlbDvvInvvJoKCiAj44Kz44Ot44OK44Km44Kk44Or44K544Gu55aR44GECiBQQ1LmpJzmn7vmlr3ooYwKIOWPs+iomOWHpuaWuQog54++5q616ZqO44Gn5YWl6Zmi6YGp5b+c44Gq44GXCiDjgb7jgZ/jgIHku6XkuIvjgavplqLjgZfjgablkIzmhI/jgpLlvpfjgZ/jgIIKIOODu+e1kOaenOmAmuefpeOBr+e/jOaXpTE45pmC6aCD44Oh44O844Or44Gn6KGM44GG44GT44GoCiDjg7vpmb3mgKfjgaDjgaPjgZ/loLTlkIjjgIHnl4fnirbnmbrnl4fml6XjgpIw5pel55uu44Go44GX44GmN+aXpeebruOBvuOBp+OBruiHquWuhemalOmbogog44O744Gd44Gu6ZaT44CB5L+d5YGl5omA44Gr44GL44KP44Gj44Gm5b2T6Zmi44GM5YGl5bq36Kaz5a+f44KS6KGM44GG44GT44GoCiDjg7vpmb3mgKfpgJrnn6Xjg6Hjg7zjg6vjgpLlj5fjgZHlj5bjgaPjgZ/mrrXpmo7jgafjgIHnl4Xnirbjga7okZfjgZfjgYTlpInljJbjgYzjgYLjgaPjgZ/loLTlkIjjga/jgZTpgKPntaHjgY/jgaDjgZXjgYTjgII=",
                title: "page1",
              },
            },
          ],
          context: {
            encounter: [
              {
                reference: "Encounter/d53af55d-d41b-42dc-97e9-7e6b72e1fca5",
              },
            ],
          },
          date: "2022-09-22 00:10:07.828272+00:00",
          status: "current",
          subject: {
            reference: "Patient/d2d38e2b-bc1a-49df-b561-fded028cf918",
          },
          type: {
            coding: [
              {
                code: "55110-1",
                display: "Conclusions Document",
                system: "http://loinc.org",
              },
            ],
          },
          resourceType: "DocumentReference",
        },
      ],
    },
  };

  it("Should return 2 appointments in the list of appointments history", () => {
    const appointmentHistory = appointments(state, getters, rootState);
    expect(appointmentHistory.length).toBe(2);
  });

  it("Should return the correct number medications or return empty array", () => {
    const appointmentHistory = appointments(state, getters, rootState);

    for (const appt of appointmentHistory) {
      expect(typeof appt.medications).toBe("object");
    }
  });

  it("Should return the correct number tests or return empty array", () => {
    const appointmentHistory = appointments(state, getters, rootState);

    for (const appt of appointmentHistory) {
      expect(typeof appt.tests).toBe("object");
    }
  });
});
