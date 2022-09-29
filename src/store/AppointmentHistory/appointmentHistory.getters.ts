import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";
import { base64ToString } from "@/utils/fileProcess";

export function appointments(state: any, getters: any, rootState: any) {
  const appointments = state.appointments;

  if (!appointments.length) {
    return [];
  }

  const encounters = state.encounters;

  if (!encounters.length) {
    return [];
  }

  const documentReferences = rootState.$_patients.documentReferences;

  let clinicalNotes: any[] = [];
  if (documentReferences.length) {
    clinicalNotes = documentReferences.filter((documentReference: any) => {
      if (
        documentReference &&
        documentReference.category &&
        documentReference.category[0].coding
      ) {
        return documentReference.category[0].coding[0].code === "clinical-note";
      }
    });
  }

  const medications = state.medications;

  const tests = state.tests;

  return appointments
    .map((appointment: any) => {
      if (!appointment) {
        return;
      }

      const encounter = encounters.find(
        (enc: any) =>
          enc.appointment[0].reference.split("/")[1] === appointment.id
      );

      let clinicalNote = null;
      if (encounter && clinicalNotes.length) {
        const clinicalNoteObj = clinicalNotes.find(
          (note: any) =>
            note.context.encounter[0].reference.split("/")[1] === encounter.id
        );

        if (!clinicalNoteObj) {
          return;
        }

        clinicalNote = {
          note: base64ToString(clinicalNoteObj?.content[0]?.attachment?.data),

          createdOn: formatDateString(
            clinicalNoteObj.date,
            TimeConstants.monthDayYearTime
          ),
        };
      }

      let medicationHistory = null;
      if (encounter) {
        medicationHistory = medications
          .filter(
            (medication: any) =>
              medication.encounter.reference.split("/")[1] === encounter.id
          )
          .map((medication: any) => {
            return {
              display: medication.medicationCodeableConcept.coding[0].display,
              value: medication.medicationCodeableConcept.coding[0].code,
            };
          });
      }

      let testsHistory = null;
      if (encounter) {
        testsHistory = tests
          .filter(
            (test: any) =>
              test.encounter.reference.split("/")[1] === encounter.id
          )
          .map((test: any) => {
            return {
              display: test.code.coding[0].display,
              value: test.code.coding[0].code,
            };
          });
      }

      return {
        id: appointment.id,
        patient: {
          id: appointment.patient.id,
          firstName: appointment.patient.name[0].given[0],
          familyName: appointment.patient.name[0].family,
        },
        practitioner: appointment.practitioner.name[0].text,
        date: formatDateString(appointment.start, TimeConstants.monthDayYear),
        start: formatDateString(appointment.start, TimeConstants.time),
        end: formatDateString(appointment.end, TimeConstants.time),
        status: appointment.status,
        type: appointment.serviceType[0].coding[0].display,
        encounter: encounter,
        clinicalNote: clinicalNote,
        medications: medicationHistory,
        tests: testsHistory,
      };
    })

    .filter((appt: any) => appt?.status === "fulfilled");
}

export function appointment(state: any) {
  const appointment = state.appointment;
  if (!appointment) {
    return;
  }

  return {
    id: appointment.id,
    patient: appointment.participant
      .find((item: any) => item.actor.reference.includes("Patient"))
      .actor.reference.split("/")[1],
    practitionerRole: appointment.participant
      .find((item: any) => item.actor.reference.includes("PractitionerRole"))
      .actor.reference.split("/")[1],
    date: formatDateString(appointment.start, TimeConstants.monthDayYear),
    start: formatDateString(appointment.start, TimeConstants.time),
    end: formatDateString(appointment.end, TimeConstants.time),
    status: appointment.status,
    type: appointment.serviceType[0].coding[0].display,
  };
}

export function diagnosticReports(state: any) {
  const diagnosticReports = state.diagnosticReports;

  if (!diagnosticReports) {
    return [];
  }

  return diagnosticReports.map((report: any) => ({
    id: report.id,
    note: report.conclusion,
    createdOn: formatDateString(
      report.meta.lastUpdated,
      TimeConstants.monthDayYearTime
    ),
  }));
}

export function medications(state: any) {
  const medications = state.medications;

  if (medications) {
    const medicationArray = [];
    for (let i = 0; i < medications.length; i++) {
      medicationArray.push(medications[i].display);
    }
    medicationArray.sort();
    return medicationArray.join(",");
  }
}
