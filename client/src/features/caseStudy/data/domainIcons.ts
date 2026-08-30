//client\src\features\caseStudy\data\domainIcons.ts
import heatingIcon from "../../../assets/domains/heating.png";
import coolingIcon from "../../../assets/domains/cooling.png";
import dhwIcon from "../../../assets/domains/dhw.png";
import ventilationIcon from "../../../assets/domains/ventilation.png";
import lightingIcon from "../../../assets/domains/lighting.png";
import envelopeIcon from "../../../assets/domains/envelope.png";
import electricityIcon from "../../../assets/domains/electricity.png";
import evIcon from "../../../assets/domains/ev.png";
import monitoringIcon from "../../../assets/domains/monitoring.png";
import type { TechnicalDomainName } from "../types/caseStudy.types";

export const domainIcons: Record<TechnicalDomainName, string> = {
  Heating: heatingIcon,
  Cooling: coolingIcon,
  "Domestic hot water": dhwIcon,
  Ventilation: ventilationIcon,
  Lighting: lightingIcon,
  "Dynamic building envelope": envelopeIcon,
  Electricity: electricityIcon,
  "Electric vehicle charging": evIcon,
  "Monitoring and control": monitoringIcon,
};