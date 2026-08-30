// client/src/features/course/data/questions/index.ts

import type {
  TheoryLessonId,
  TheorySectionId,
} from "../../../theory/types/theory.types";

import type {
  CourseQuestion,
} from "../../course.types";

import {
  introductionToSriQuestionPool,
  introductionToSriQuestionsByLesson,
} from "./section01.questions";

import {
  assessmentFrameworkQuestionPool,
  assessmentFrameworkQuestionsByLesson,
} from "./section02.questions";

import {
  heatingQuestionPool,
  heatingQuestionsByLesson,
} from "./section03.questions";

import {
  coolingQuestionPool,
  coolingQuestionsByLesson,
} from "./section04.questions";

import {
  domesticHotWaterQuestionPool,
  domesticHotWaterQuestionsByLesson,
} from "./section05.questions";

import {
  ventilationQuestionPool,
  ventilationQuestionsByLesson,
} from "./section06.questions";

import {
  lightingQuestionPool,
  lightingQuestionsByLesson,
} from "./section07.questions";

import {
  dynamicBuildingEnvelopeQuestionPool,
  dynamicBuildingEnvelopeQuestionsByLesson,
} from "./section08.questions";

import {
  electricityQuestionPool,
  electricityQuestionsByLesson,
} from "./section09.questions";

import {
  electricVehicleChargingQuestionPool,
  electricVehicleChargingQuestionsByLesson,
} from "./section10.questions";

import {
  monitoringAndControlQuestionPool,
  monitoringAndControlQuestionsByLesson,
} from "./section11.questions";

const emptyQuestionList:
  readonly CourseQuestion[] = [];

const questionsByLessonId: Readonly<
  Partial<
    Record<
      TheoryLessonId,
      readonly CourseQuestion[]
    >
  >
> = {
  ...introductionToSriQuestionsByLesson,
  ...assessmentFrameworkQuestionsByLesson,
  ...heatingQuestionsByLesson,
  ...coolingQuestionsByLesson,
  ...domesticHotWaterQuestionsByLesson,
  ...ventilationQuestionsByLesson,
  ...lightingQuestionsByLesson,
  ...dynamicBuildingEnvelopeQuestionsByLesson,
  ...electricityQuestionsByLesson,
  ...electricVehicleChargingQuestionsByLesson,
  ...monitoringAndControlQuestionsByLesson,
};

const questionsBySectionId: Readonly<
  Partial<
    Record<
      TheorySectionId,
      readonly CourseQuestion[]
    >
  >
> = {
  "introduction-to-sri":
    introductionToSriQuestionPool,

  "sri-assessment-framework":
    assessmentFrameworkQuestionPool,

  "heating-domain":
    heatingQuestionPool,

  "cooling-domain":
    coolingQuestionPool,

  "domestic-hot-water-domain":
    domesticHotWaterQuestionPool,

  "ventilation-domain":
    ventilationQuestionPool,

  "lighting-domain":
    lightingQuestionPool,

  "dynamic-building-envelope-domain":
    dynamicBuildingEnvelopeQuestionPool,

  "electricity-domain":
    electricityQuestionPool,

  "electric-vehicle-charging-domain":
    electricVehicleChargingQuestionPool,

  "monitoring-and-control-domain":
    monitoringAndControlQuestionPool,
};

export const getLessonQuizQuestions = (
  lessonId: TheoryLessonId,
): readonly CourseQuestion[] => {
  return (
    questionsByLessonId[lessonId] ??
    emptyQuestionList
  );
};

export const getSectionFinalTestQuestionPool = (
  sectionId: TheorySectionId,
): readonly CourseQuestion[] => {
  return (
    questionsBySectionId[sectionId] ??
    emptyQuestionList
  );
};