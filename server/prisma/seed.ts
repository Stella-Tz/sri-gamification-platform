import "dotenv/config";
import { readFileSync } from "node:fs";

import {
  AssessmentMethod,
  BuildingState,
  BuildingType,
  BuildingUsage,
  CaseStudyMode,
  ClimateZone,
  CourseStepType,
  DomainPresence,
} from "@prisma/client";

import prisma from "../src/prismaClient.js";

type SeedData = any;
type ExpectedCounts = Record<string, number>;

const seedData = JSON.parse(
  readFileSync(
    new URL("./seed-data/seed-data.json", import.meta.url),
    "utf8",
  ),
) as SeedData;

const expectedCounts = JSON.parse(
  readFileSync(
    new URL("./seed-data/expected-counts.json", import.meta.url),
    "utf8",
  ),
) as ExpectedCounts;

const asAssessmentMethod = (value: string): AssessmentMethod => {
  if (value === "A") return AssessmentMethod.A;
  if (value === "B") return AssessmentMethod.B;
  throw new Error(`Unsupported assessment method: ${value}`);
};

const asCourseStepType = (value: string): CourseStepType => {
  const result = CourseStepType[value as keyof typeof CourseStepType];
  if (!result) throw new Error(`Unsupported course step type: ${value}`);
  return result;
};

const asBuildingType = (value: string): BuildingType => {
  const result = BuildingType[value as keyof typeof BuildingType];
  if (!result) throw new Error(`Unsupported building type: ${value}`);
  return result;
};

const asBuildingUsage = (value: string): BuildingUsage => {
  const result = BuildingUsage[value as keyof typeof BuildingUsage];
  if (!result) throw new Error(`Unsupported building usage: ${value}`);
  return result;
};

const asBuildingState = (value: string): BuildingState => {
  const result = BuildingState[value as keyof typeof BuildingState];
  if (!result) throw new Error(`Unsupported building state: ${value}`);
  return result;
};

const asClimateZone = (value: string): ClimateZone => {
  const result = ClimateZone[value as keyof typeof ClimateZone];
  if (!result) throw new Error(`Unsupported climate zone: ${value}`);
  return result;
};

const asDomainPresence = (value: string): DomainPresence => {
  const result = DomainPresence[value as keyof typeof DomainPresence];
  if (!result) throw new Error(`Unsupported domain presence: ${value}`);
  return result;
};

const asCaseStudyMode = (value: string): CaseStudyMode => {
  const result = CaseStudyMode[value as keyof typeof CaseStudyMode];
  if (!result) throw new Error(`Unsupported case-study mode: ${value}`);
  return result;
};

async function seedCourse(): Promise<void> {
  const course = seedData.course;

  await prisma.course.upsert({
    where: { id: course.id },
    update: {},
    create: { id: course.id },
  });

  for (const section of course.sections) {
    await prisma.courseSection.upsert({
      where: { id: section.id },
      update: {
        courseId: course.id,
        order: section.order,
      },
      create: {
        id: section.id,
        courseId: course.id,
        order: section.order,
      },
    });

    for (const step of section.steps) {
      await prisma.courseStep.upsert({
        where: { id: step.id },
        update: {
          sectionId: section.id,
          type: asCourseStepType(step.type),
          order: step.order,
          theoryLessonKey: step.theoryLessonKey,
        },
        create: {
          id: step.id,
          sectionId: section.id,
          type: asCourseStepType(step.type),
          order: step.order,
          theoryLessonKey: step.theoryLessonKey,
        },
      });
    }
  }

  for (const question of course.questions) {
    await prisma.courseQuestion.upsert({
      where: { id: question.id },
      update: {
        sectionId: question.sectionId,
        theoryLessonKey: question.theoryLessonKey,
        prompt: question.prompt,
        correctOptionKey: question.correctOptionKey,
        explanation: question.explanation,
        order: question.order,
      },
      create: {
        id: question.id,
        sectionId: question.sectionId,
        theoryLessonKey: question.theoryLessonKey,
        prompt: question.prompt,
        correctOptionKey: question.correctOptionKey,
        explanation: question.explanation,
        order: question.order,
      },
    });

    for (const option of question.options) {
      await prisma.courseQuestionOption.upsert({
        where: {
          questionId_key: {
            questionId: question.id,
            key: option.key,
          },
        },
        update: {
          text: option.text,
          order: option.order,
        },
        create: {
          questionId: question.id,
          key: option.key,
          text: option.text,
          order: option.order,
        },
      });
    }
  }
}

async function seedSriReferenceData(): Promise<void> {
  const sri = seedData.sri;

  for (const item of sri.keyFunctionalities) {
    await prisma.sriKeyFunctionality.upsert({
      where: { id: item.id },
      update: { name: item.name, order: item.order },
      create: { id: item.id, name: item.name, order: item.order },
    });
  }

  for (const item of sri.impactCriteria) {
    await prisma.sriImpactCriterion.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        order: item.order,
        overallWeight: item.overallWeight,
        keyFunctionalityId: item.keyFunctionalityId,
      },
      create: {
        id: item.id,
        name: item.name,
        order: item.order,
        overallWeight: item.overallWeight,
        keyFunctionalityId: item.keyFunctionalityId,
      },
    });
  }

  for (const item of sri.domains) {
    await prisma.sriTechnicalDomain.upsert({
      where: { id: item.id },
      update: { name: item.name, order: item.order },
      create: { id: item.id, name: item.name, order: item.order },
    });
  }

  for (const item of sri.countries) {
    await prisma.sriCountry.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        climateZone: asClimateZone(item.climateZone),
      },
      create: {
        id: item.id,
        name: item.name,
        climateZone: asClimateZone(item.climateZone),
      },
    });
  }

  for (const service of sri.services) {
    await prisma.sriService.upsert({
      where: { id: service.id },
      update: {
        code: service.code,
        domainId: service.domainId,
      },
      create: {
        id: service.id,
        code: service.code,
        domainId: service.domainId,
      },
    });
  }

  for (const definition of sri.serviceMethods) {
    const method = asAssessmentMethod(definition.method);

    const serviceMethod = await prisma.sriServiceMethod.upsert({
      where: {
        serviceId_method: {
          serviceId: definition.serviceId,
          method,
        },
      },
      update: {
        serviceGroup: definition.serviceGroup,
        smartReadyService: definition.smartReadyService,
        triageValue: definition.triageValue,
        officialDescription: definition.officialDescription,
        triageNote: definition.triageNote,
        applicabilityNote: definition.applicabilityNote,
        methodologyNote: definition.methodologyNote,
      },
      create: {
        serviceId: definition.serviceId,
        method,
        serviceGroup: definition.serviceGroup,
        smartReadyService: definition.smartReadyService,
        triageValue: definition.triageValue,
        officialDescription: definition.officialDescription,
        triageNote: definition.triageNote,
        applicabilityNote: definition.applicabilityNote,
        methodologyNote: definition.methodologyNote,
      },
    });

    for (const level of definition.levels) {
      const levelRow = await prisma.sriFunctionalityLevel.upsert({
        where: {
          serviceMethodId_level: {
            serviceMethodId: serviceMethod.id,
            level: level.level,
          },
        },
        update: {
          sourceLevelKey: level.sourceLevelKey,
          officialDescription: level.officialDescription,
        },
        create: {
          serviceMethodId: serviceMethod.id,
          level: level.level,
          sourceLevelKey: level.sourceLevelKey,
          officialDescription: level.officialDescription,
        },
      });

      for (const impactScore of level.impactScores) {
        await prisma.sriImpactScore.upsert({
          where: {
            levelId_impactCriterionId: {
              levelId: levelRow.id,
              impactCriterionId: impactScore.impactCriterionId,
            },
          },
          update: { score: impactScore.score },
          create: {
            levelId: levelRow.id,
            impactCriterionId: impactScore.impactCriterionId,
            score: impactScore.score,
          },
        });
      }
    }
  }

  for (const row of sri.domainWeights) {
    const method = asAssessmentMethod(row.method);
    const buildingType = asBuildingType(row.buildingType);
    const climateZone = asClimateZone(row.climateZone);

    await prisma.sriDomainWeight.upsert({
      where: {
        method_buildingType_climateZone_domainId_impactCriterionId: {
          method,
          buildingType,
          climateZone,
          domainId: row.domainId,
          impactCriterionId: row.impactCriterionId,
        },
      },
      update: { weight: row.weight },
      create: {
        method,
        buildingType,
        climateZone,
        domainId: row.domainId,
        impactCriterionId: row.impactCriterionId,
        weight: row.weight,
      },
    });
  }
}

async function seedCaseStudies(): Promise<void> {
  for (const item of seedData.caseStudies) {
    const expectedAssessmentMethod = asAssessmentMethod(
      item.expectedAssessmentMethod,
    );

    await prisma.caseStudy.upsert({
      where: { id: item.id },
      update: {
        order: item.order,
        title: item.title,
        description: item.description,
        mode: asCaseStudyMode(item.mode),
        scenario: item.scenario,
        buildingType: asBuildingType(item.buildingType),
        buildingUsage: asBuildingUsage(item.buildingUsage),
        locationLabel: item.locationLabel,
        countryId: item.countryId,
        floorArea: item.floorArea,
        constructionYear: item.constructionYear,
        buildingState: asBuildingState(item.buildingState),
        renovationYear: item.renovationYear,
        expectedAssessmentMethod,
      },
      create: {
        id: item.id,
        order: item.order,
        title: item.title,
        description: item.description,
        mode: asCaseStudyMode(item.mode),
        scenario: item.scenario,
        buildingType: asBuildingType(item.buildingType),
        buildingUsage: asBuildingUsage(item.buildingUsage),
        locationLabel: item.locationLabel,
        countryId: item.countryId,
        floorArea: item.floorArea,
        constructionYear: item.constructionYear,
        buildingState: asBuildingState(item.buildingState),
        renovationYear: item.renovationYear,
        expectedAssessmentMethod,
      },
    });

    for (const expected of item.expectedDomainPresence) {
      await prisma.caseStudyExpectedDomainPresence.upsert({
        where: {
          caseStudyId_domainId: {
            caseStudyId: item.id,
            domainId: expected.domainId,
          },
        },
        update: { status: asDomainPresence(expected.status) },
        create: {
          caseStudyId: item.id,
          domainId: expected.domainId,
          status: asDomainPresence(expected.status),
        },
      });
    }

    for (const selection of item.selectedServices) {
      const method = asAssessmentMethod(selection.method);

      const serviceMethod = await prisma.sriServiceMethod.findUniqueOrThrow({
        where: {
          serviceId_method: {
            serviceId: selection.serviceId,
            method,
          },
        },
      });

      const primaryLevel = await prisma.sriFunctionalityLevel.findUniqueOrThrow({
        where: {
          serviceMethodId_sourceLevelKey: {
            serviceMethodId: serviceMethod.id,
            sourceLevelKey: selection.expectedPrimarySourceLevelKey,
          },
        },
      });

      const additionalLevel = selection.expectedAdditionalSourceLevelKey
        ? await prisma.sriFunctionalityLevel.findUniqueOrThrow({
            where: {
              serviceMethodId_sourceLevelKey: {
                serviceMethodId: serviceMethod.id,
                sourceLevelKey: selection.expectedAdditionalSourceLevelKey,
              },
            },
          })
        : null;

      await prisma.caseStudySelectedService.upsert({
        where: {
          caseStudyId_serviceMethodId: {
            caseStudyId: item.id,
            serviceMethodId: serviceMethod.id,
          },
        },
        update: {
          order: selection.order,
          scenarioEvidence: selection.scenarioEvidence,
          expectedPrimaryLevelId: primaryLevel.id,
          expectedShare: selection.expectedShare,
          expectedAdditionalLevelId: additionalLevel?.id ?? null,
        },
        create: {
          caseStudyId: item.id,
          serviceMethodId: serviceMethod.id,
          order: selection.order,
          scenarioEvidence: selection.scenarioEvidence,
          expectedPrimaryLevelId: primaryLevel.id,
          expectedShare: selection.expectedShare,
          expectedAdditionalLevelId: additionalLevel?.id ?? null,
        },
      });
    }
  }
}

async function validateSeedCounts(): Promise<void> {
  const actual = {
    sections: await prisma.courseSection.count(),
    steps: await prisma.courseStep.count(),
    questions: await prisma.courseQuestion.count(),
    options: await prisma.courseQuestionOption.count(),
    domains: await prisma.sriTechnicalDomain.count(),
    impactCriteria: await prisma.sriImpactCriterion.count(),
    keyFunctionalities: await prisma.sriKeyFunctionality.count(),
    countries: await prisma.sriCountry.count(),
    services: await prisma.sriService.count(),
    serviceMethods: await prisma.sriServiceMethod.count(),
    methodAServiceMethods: await prisma.sriServiceMethod.count({
      where: { method: AssessmentMethod.A },
    }),
    methodBServiceMethods: await prisma.sriServiceMethod.count({
      where: { method: AssessmentMethod.B },
    }),
    levels: await prisma.sriFunctionalityLevel.count(),
    impactScores: await prisma.sriImpactScore.count(),
    domainWeights: await prisma.sriDomainWeight.count(),
    caseStudies: await prisma.caseStudy.count(),
    selectedServices: await prisma.caseStudySelectedService.count(),
    expectedDomainPresence: await prisma.caseStudyExpectedDomainPresence.count(),
  };

  const failures: string[] = [];

  for (const [key, expected] of Object.entries(expectedCounts)) {
    if (!(key in actual)) continue;
    const actualValue = actual[key as keyof typeof actual];
    if (actualValue !== expected) {
      failures.push(`${key}: expected ${expected}, got ${actualValue}`);
    }
  }

  console.table(actual);

  if (failures.length > 0) {
    throw new Error(`Seed validation failed:\n${failures.join("\n")}`);
  }
}

async function main(): Promise<void> {
  console.log("Seeding Course structure and question bank...");
  await seedCourse();

  console.log("Seeding canonical SRI reference data...");
  await seedSriReferenceData();

  console.log("Seeding Case Study definition...");
  await seedCaseStudies();

  console.log("Validating seeded data...");
  await validateSeedCounts();

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
