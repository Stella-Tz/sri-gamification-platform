// client/src/features/caseStudy/hooks/useSimulation.ts

import { useState } from "react";

import { runSriSimulation } from "../utils/simulation.utils";

import type {
  BuildingType,
  CaseStudySubmitResult,
  ClimateZone,
  DomainPresence,
  GuidedImprovementAnalysisFindings,
  OfficialAssessmentMethod,
  ServiceAnswer,
  SimulationResult,
  SriService,
  TechnicalDomainName,
} from "../types/caseStudy.types";

type UseSimulationParams = {
  services: SriService[];
  answers: Record<string, ServiceAnswer>;

  assessmentMethod: OfficialAssessmentMethod;
  serviceApplicability: Record<string, boolean>;

  domainPresence: Record<
    TechnicalDomainName,
    DomainPresence | ""
  >;

  buildingType: BuildingType;
  climateZone: ClimateZone;

  currentResult: CaseStudySubmitResult | null;
  findings: GuidedImprovementAnalysisFindings | null;
};

export const useSimulation = ({
  services,
  answers,
  assessmentMethod,
  serviceApplicability,
  domainPresence,
  buildingType,
  climateZone,
  currentResult,
  findings,
}: UseSimulationParams) => {
  const [hasRunSimulation, setHasRunSimulation] =
    useState(false);

  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);

  const canRunSimulation =
    findings !== null &&
    currentResult !== null;

  const runSimulation = (): SimulationResult | null => {
    if (!findings || !currentResult) {
      return null;
    }

    const result = runSriSimulation({
      services,
      answers,
      assessmentMethod,
      serviceApplicability,
      domainPresence,
      buildingType,
      climateZone,
      currentResult,
      findings,
    });

    if (!result) {
      setSimulationResult(null);
      setHasRunSimulation(false);

      return null;
    }

    setSimulationResult(result);
    setHasRunSimulation(true);

    return result;
  };

  const resetSimulation = () => {
    setSimulationResult(null);
    setHasRunSimulation(false);
  };

  return {
    canRunSimulation,
    hasRunSimulation,
    simulationResult,
    runSimulation,
    resetSimulation,
  };
};