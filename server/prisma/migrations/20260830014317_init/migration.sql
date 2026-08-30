-- CreateEnum
CREATE TYPE "CourseStepType" AS ENUM ('LESSON', 'QUIZ', 'FINAL_TEST');

-- CreateEnum
CREATE TYPE "FinalTestAttemptStatus" AS ENUM ('IN_PROGRESS', 'PASSED', 'FAILED');

-- CreateEnum
CREATE TYPE "AssessmentMethod" AS ENUM ('A', 'B');

-- CreateEnum
CREATE TYPE "BuildingType" AS ENUM ('RESIDENTIAL', 'NON_RESIDENTIAL');

-- CreateEnum
CREATE TYPE "BuildingUsage" AS ENUM ('SINGLE_FAMILY_HOUSE', 'SMALL_MULTI_FAMILY_HOUSE', 'LARGE_MULTI_FAMILY_HOUSE', 'RESIDENTIAL_OTHER', 'OFFICE', 'EDUCATIONAL_BUILDINGS', 'HEALTHCARE', 'NON_RESIDENTIAL_OTHER');

-- CreateEnum
CREATE TYPE "BuildingState" AS ENUM ('ORIGINAL', 'RENOVATED');

-- CreateEnum
CREATE TYPE "ClimateZone" AS ENUM ('NORTHERN_EUROPE', 'WESTERN_EUROPE', 'SOUTHERN_EUROPE', 'NORTH_EASTERN_EUROPE', 'SOUTH_EASTERN_EUROPE');

-- CreateEnum
CREATE TYPE "DomainPresence" AS ENUM ('PRESENT', 'ABSENT_MANDATORY', 'ABSENT_NOT_MANDATORY');

-- CreateEnum
CREATE TYPE "CaseStudyMode" AS ENUM ('BASELINE', 'IMPROVEMENT');

-- CreateEnum
CREATE TYPE "CaseStudyRouteStage" AS ENUM ('SETUP', 'ASSESSMENT', 'RESULTS', 'GUIDED_IMPROVEMENT_ANALYSIS', 'SIMULATION_RESULTS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSection" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CourseSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStep" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "type" "CourseStepType" NOT NULL,
    "order" INTEGER NOT NULL,
    "theoryLessonKey" TEXT,

    CONSTRAINT "CourseStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseQuestion" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "theoryLessonKey" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "correctOptionKey" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CourseQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseQuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CourseQuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCompletedCourseStep" (
    "userId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCompletedCourseStep_pkey" PRIMARY KEY ("userId","stepId")
);

-- CreateTable
CREATE TABLE "FinalTestAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "finalTestStepId" TEXT NOT NULL,
    "status" "FinalTestAttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "allowedMistakes" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "FinalTestAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinalTestAttemptQuestion" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "optionOrder" TEXT[],
    "selectedOptionKey" TEXT,
    "isCorrect" BOOLEAN,
    "answeredAt" TIMESTAMP(3),

    CONSTRAINT "FinalTestAttemptQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SriKeyFunctionality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SriKeyFunctionality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SriImpactCriterion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "overallWeight" DOUBLE PRECISION NOT NULL,
    "keyFunctionalityId" TEXT NOT NULL,

    CONSTRAINT "SriImpactCriterion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SriTechnicalDomain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SriTechnicalDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SriCountry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "climateZone" "ClimateZone" NOT NULL,

    CONSTRAINT "SriCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SriService" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,

    CONSTRAINT "SriService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SriServiceMethod" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "method" "AssessmentMethod" NOT NULL,
    "serviceGroup" TEXT NOT NULL,
    "smartReadyService" TEXT NOT NULL,
    "triageValue" INTEGER NOT NULL,
    "officialDescription" TEXT,
    "triageNote" TEXT,
    "applicabilityNote" TEXT,
    "methodologyNote" TEXT,

    CONSTRAINT "SriServiceMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SriFunctionalityLevel" (
    "id" TEXT NOT NULL,
    "serviceMethodId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "sourceLevelKey" TEXT NOT NULL,
    "officialDescription" TEXT NOT NULL,

    CONSTRAINT "SriFunctionalityLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SriImpactScore" (
    "levelId" TEXT NOT NULL,
    "impactCriterionId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SriImpactScore_pkey" PRIMARY KEY ("levelId","impactCriterionId")
);

-- CreateTable
CREATE TABLE "SriDomainWeight" (
    "method" "AssessmentMethod" NOT NULL,
    "buildingType" "BuildingType" NOT NULL,
    "climateZone" "ClimateZone" NOT NULL,
    "domainId" TEXT NOT NULL,
    "impactCriterionId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SriDomainWeight_pkey" PRIMARY KEY ("method","buildingType","climateZone","domainId","impactCriterionId")
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mode" "CaseStudyMode" NOT NULL DEFAULT 'BASELINE',
    "scenario" JSONB NOT NULL,
    "buildingType" "BuildingType" NOT NULL,
    "buildingUsage" "BuildingUsage" NOT NULL,
    "locationLabel" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "floorArea" DOUBLE PRECISION NOT NULL,
    "constructionYear" INTEGER NOT NULL,
    "buildingState" "BuildingState" NOT NULL,
    "renovationYear" INTEGER,
    "expectedAssessmentMethod" "AssessmentMethod" NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudyExpectedDomainPresence" (
    "caseStudyId" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "status" "DomainPresence" NOT NULL,

    CONSTRAINT "CaseStudyExpectedDomainPresence_pkey" PRIMARY KEY ("caseStudyId","domainId")
);

-- CreateTable
CREATE TABLE "CaseStudySelectedService" (
    "id" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "serviceMethodId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "scenarioEvidence" TEXT[],
    "expectedPrimaryLevelId" TEXT NOT NULL,
    "expectedShare" DOUBLE PRECISION NOT NULL,
    "expectedAdditionalLevelId" TEXT,

    CONSTRAINT "CaseStudySelectedService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCaseStudyProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "officialAttemptId" TEXT,
    "activeAttemptId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCaseStudyProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudyAttempt" (
    "id" TEXT NOT NULL,
    "progressId" TEXT NOT NULL,
    "lastVisitedStage" "CaseStudyRouteStage",
    "buildingType" "BuildingType",
    "buildingUsage" "BuildingUsage",
    "countryId" TEXT,
    "floorArea" DOUBLE PRECISION,
    "constructionYear" INTEGER,
    "buildingState" "BuildingState",
    "renovationYear" INTEGER,
    "assessmentMethod" "AssessmentMethod",
    "setupCompleted" BOOLEAN NOT NULL DEFAULT false,
    "assessmentCompleted" BOOLEAN NOT NULL DEFAULT false,
    "activeScenarioServiceId" TEXT,
    "baselineResult" JSONB,
    "simulationResult" JSONB,
    "resultsInvestigation" JSONB,
    "guidedImprovement" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudyAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudyAttemptDomainPresence" (
    "attemptId" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "status" "DomainPresence" NOT NULL,

    CONSTRAINT "CaseStudyAttemptDomainPresence_pkey" PRIMARY KEY ("attemptId","domainId")
);

-- CreateTable
CREATE TABLE "CaseStudyAttemptServiceAnswer" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "scenarioServiceId" TEXT NOT NULL,
    "primaryLevelId" TEXT NOT NULL,
    "share" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "additionalLevelId" TEXT,
    "validated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CaseStudyAttemptServiceAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CourseSection_courseId_order_key" ON "CourseSection"("courseId", "order");

-- CreateIndex
CREATE INDEX "CourseStep_sectionId_type_idx" ON "CourseStep"("sectionId", "type");

-- CreateIndex
CREATE INDEX "CourseStep_theoryLessonKey_idx" ON "CourseStep"("theoryLessonKey");

-- CreateIndex
CREATE UNIQUE INDEX "CourseStep_sectionId_order_key" ON "CourseStep"("sectionId", "order");

-- CreateIndex
CREATE INDEX "CourseQuestion_sectionId_idx" ON "CourseQuestion"("sectionId");

-- CreateIndex
CREATE INDEX "CourseQuestion_theoryLessonKey_idx" ON "CourseQuestion"("theoryLessonKey");

-- CreateIndex
CREATE UNIQUE INDEX "CourseQuestion_theoryLessonKey_order_key" ON "CourseQuestion"("theoryLessonKey", "order");

-- CreateIndex
CREATE UNIQUE INDEX "CourseQuestionOption_questionId_key_key" ON "CourseQuestionOption"("questionId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "CourseQuestionOption_questionId_order_key" ON "CourseQuestionOption"("questionId", "order");

-- CreateIndex
CREATE INDEX "UserCompletedCourseStep_stepId_idx" ON "UserCompletedCourseStep"("stepId");

-- CreateIndex
CREATE INDEX "FinalTestAttempt_userId_finalTestStepId_startedAt_idx" ON "FinalTestAttempt"("userId", "finalTestStepId", "startedAt");

-- CreateIndex
CREATE INDEX "FinalTestAttempt_status_idx" ON "FinalTestAttempt"("status");

-- CreateIndex
CREATE INDEX "FinalTestAttemptQuestion_questionId_idx" ON "FinalTestAttemptQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "FinalTestAttemptQuestion_attemptId_questionId_key" ON "FinalTestAttemptQuestion"("attemptId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "FinalTestAttemptQuestion_attemptId_position_key" ON "FinalTestAttemptQuestion"("attemptId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "SriKeyFunctionality_name_key" ON "SriKeyFunctionality"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SriImpactCriterion_name_key" ON "SriImpactCriterion"("name");

-- CreateIndex
CREATE INDEX "SriImpactCriterion_keyFunctionalityId_idx" ON "SriImpactCriterion"("keyFunctionalityId");

-- CreateIndex
CREATE UNIQUE INDEX "SriTechnicalDomain_name_key" ON "SriTechnicalDomain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SriCountry_name_key" ON "SriCountry"("name");

-- CreateIndex
CREATE INDEX "SriCountry_climateZone_idx" ON "SriCountry"("climateZone");

-- CreateIndex
CREATE UNIQUE INDEX "SriService_code_key" ON "SriService"("code");

-- CreateIndex
CREATE INDEX "SriService_domainId_idx" ON "SriService"("domainId");

-- CreateIndex
CREATE INDEX "SriServiceMethod_method_idx" ON "SriServiceMethod"("method");

-- CreateIndex
CREATE UNIQUE INDEX "SriServiceMethod_serviceId_method_key" ON "SriServiceMethod"("serviceId", "method");

-- CreateIndex
CREATE INDEX "SriFunctionalityLevel_sourceLevelKey_idx" ON "SriFunctionalityLevel"("sourceLevelKey");

-- CreateIndex
CREATE UNIQUE INDEX "SriFunctionalityLevel_serviceMethodId_level_key" ON "SriFunctionalityLevel"("serviceMethodId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "SriFunctionalityLevel_serviceMethodId_sourceLevelKey_key" ON "SriFunctionalityLevel"("serviceMethodId", "sourceLevelKey");

-- CreateIndex
CREATE INDEX "SriImpactScore_impactCriterionId_idx" ON "SriImpactScore"("impactCriterionId");

-- CreateIndex
CREATE INDEX "SriDomainWeight_domainId_impactCriterionId_idx" ON "SriDomainWeight"("domainId", "impactCriterionId");

-- CreateIndex
CREATE INDEX "CaseStudy_countryId_idx" ON "CaseStudy"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_order_key" ON "CaseStudy"("order");

-- CreateIndex
CREATE INDEX "CaseStudySelectedService_serviceMethodId_idx" ON "CaseStudySelectedService"("serviceMethodId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudySelectedService_caseStudyId_serviceMethodId_key" ON "CaseStudySelectedService"("caseStudyId", "serviceMethodId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudySelectedService_caseStudyId_order_key" ON "CaseStudySelectedService"("caseStudyId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "UserCaseStudyProgress_officialAttemptId_key" ON "UserCaseStudyProgress"("officialAttemptId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCaseStudyProgress_activeAttemptId_key" ON "UserCaseStudyProgress"("activeAttemptId");

-- CreateIndex
CREATE INDEX "UserCaseStudyProgress_caseStudyId_idx" ON "UserCaseStudyProgress"("caseStudyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCaseStudyProgress_userId_caseStudyId_key" ON "UserCaseStudyProgress"("userId", "caseStudyId");

-- CreateIndex
CREATE INDEX "CaseStudyAttempt_progressId_startedAt_idx" ON "CaseStudyAttempt"("progressId", "startedAt");

-- CreateIndex
CREATE INDEX "CaseStudyAttempt_countryId_idx" ON "CaseStudyAttempt"("countryId");

-- CreateIndex
CREATE INDEX "CaseStudyAttempt_activeScenarioServiceId_idx" ON "CaseStudyAttempt"("activeScenarioServiceId");

-- CreateIndex
CREATE INDEX "CaseStudyAttemptDomainPresence_domainId_idx" ON "CaseStudyAttemptDomainPresence"("domainId");

-- CreateIndex
CREATE INDEX "CaseStudyAttemptServiceAnswer_scenarioServiceId_idx" ON "CaseStudyAttemptServiceAnswer"("scenarioServiceId");

-- CreateIndex
CREATE INDEX "CaseStudyAttemptServiceAnswer_primaryLevelId_idx" ON "CaseStudyAttemptServiceAnswer"("primaryLevelId");

-- CreateIndex
CREATE INDEX "CaseStudyAttemptServiceAnswer_additionalLevelId_idx" ON "CaseStudyAttemptServiceAnswer"("additionalLevelId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudyAttemptServiceAnswer_attemptId_scenarioServiceId_key" ON "CaseStudyAttemptServiceAnswer"("attemptId", "scenarioServiceId");

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStep" ADD CONSTRAINT "CourseStep_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseQuestion" ADD CONSTRAINT "CourseQuestion_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseQuestionOption" ADD CONSTRAINT "CourseQuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CourseQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompletedCourseStep" ADD CONSTRAINT "UserCompletedCourseStep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompletedCourseStep" ADD CONSTRAINT "UserCompletedCourseStep_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "CourseStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalTestAttempt" ADD CONSTRAINT "FinalTestAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalTestAttempt" ADD CONSTRAINT "FinalTestAttempt_finalTestStepId_fkey" FOREIGN KEY ("finalTestStepId") REFERENCES "CourseStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalTestAttemptQuestion" ADD CONSTRAINT "FinalTestAttemptQuestion_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "FinalTestAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalTestAttemptQuestion" ADD CONSTRAINT "FinalTestAttemptQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CourseQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SriImpactCriterion" ADD CONSTRAINT "SriImpactCriterion_keyFunctionalityId_fkey" FOREIGN KEY ("keyFunctionalityId") REFERENCES "SriKeyFunctionality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SriService" ADD CONSTRAINT "SriService_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "SriTechnicalDomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SriServiceMethod" ADD CONSTRAINT "SriServiceMethod_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "SriService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SriFunctionalityLevel" ADD CONSTRAINT "SriFunctionalityLevel_serviceMethodId_fkey" FOREIGN KEY ("serviceMethodId") REFERENCES "SriServiceMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SriImpactScore" ADD CONSTRAINT "SriImpactScore_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "SriFunctionalityLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SriImpactScore" ADD CONSTRAINT "SriImpactScore_impactCriterionId_fkey" FOREIGN KEY ("impactCriterionId") REFERENCES "SriImpactCriterion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SriDomainWeight" ADD CONSTRAINT "SriDomainWeight_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "SriTechnicalDomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SriDomainWeight" ADD CONSTRAINT "SriDomainWeight_impactCriterionId_fkey" FOREIGN KEY ("impactCriterionId") REFERENCES "SriImpactCriterion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "SriCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyExpectedDomainPresence" ADD CONSTRAINT "CaseStudyExpectedDomainPresence_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyExpectedDomainPresence" ADD CONSTRAINT "CaseStudyExpectedDomainPresence_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "SriTechnicalDomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudySelectedService" ADD CONSTRAINT "CaseStudySelectedService_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudySelectedService" ADD CONSTRAINT "CaseStudySelectedService_serviceMethodId_fkey" FOREIGN KEY ("serviceMethodId") REFERENCES "SriServiceMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudySelectedService" ADD CONSTRAINT "CaseStudySelectedService_expectedPrimaryLevelId_fkey" FOREIGN KEY ("expectedPrimaryLevelId") REFERENCES "SriFunctionalityLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudySelectedService" ADD CONSTRAINT "CaseStudySelectedService_expectedAdditionalLevelId_fkey" FOREIGN KEY ("expectedAdditionalLevelId") REFERENCES "SriFunctionalityLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCaseStudyProgress" ADD CONSTRAINT "UserCaseStudyProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCaseStudyProgress" ADD CONSTRAINT "UserCaseStudyProgress_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCaseStudyProgress" ADD CONSTRAINT "UserCaseStudyProgress_officialAttemptId_fkey" FOREIGN KEY ("officialAttemptId") REFERENCES "CaseStudyAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCaseStudyProgress" ADD CONSTRAINT "UserCaseStudyProgress_activeAttemptId_fkey" FOREIGN KEY ("activeAttemptId") REFERENCES "CaseStudyAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttempt" ADD CONSTRAINT "CaseStudyAttempt_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "UserCaseStudyProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttempt" ADD CONSTRAINT "CaseStudyAttempt_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "SriCountry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttempt" ADD CONSTRAINT "CaseStudyAttempt_activeScenarioServiceId_fkey" FOREIGN KEY ("activeScenarioServiceId") REFERENCES "CaseStudySelectedService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttemptDomainPresence" ADD CONSTRAINT "CaseStudyAttemptDomainPresence_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "CaseStudyAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttemptDomainPresence" ADD CONSTRAINT "CaseStudyAttemptDomainPresence_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "SriTechnicalDomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttemptServiceAnswer" ADD CONSTRAINT "CaseStudyAttemptServiceAnswer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "CaseStudyAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttemptServiceAnswer" ADD CONSTRAINT "CaseStudyAttemptServiceAnswer_scenarioServiceId_fkey" FOREIGN KEY ("scenarioServiceId") REFERENCES "CaseStudySelectedService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttemptServiceAnswer" ADD CONSTRAINT "CaseStudyAttemptServiceAnswer_primaryLevelId_fkey" FOREIGN KEY ("primaryLevelId") REFERENCES "SriFunctionalityLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyAttemptServiceAnswer" ADD CONSTRAINT "CaseStudyAttemptServiceAnswer_additionalLevelId_fkey" FOREIGN KEY ("additionalLevelId") REFERENCES "SriFunctionalityLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
