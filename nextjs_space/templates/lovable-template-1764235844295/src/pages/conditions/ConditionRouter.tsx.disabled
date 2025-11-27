import { useParams, Navigate } from "react-router-dom";
import ChronicPain from "./ChronicPain";
import Anxiety from "./Anxiety";
import ComplexRegionalPainSyndrome from "./ComplexRegionalPainSyndrome";
import Arthritis from "./Arthritis";
import BackPain from "./BackPain";
import NeuropathicPain from "./NeuropathicPain";
import Migraines from "./Migraines";
import Insomnia from "./Insomnia";
import PTSD from "./PTSD";
import Epilepsy from "./Epilepsy";
import MultipleSclerosis from "./MultipleSclerosis";
import Parkinsons from "./Parkinsons";

const ConditionRouter = () => {
  const { conditionId } = useParams<{ conditionId: string }>();

  const conditionComponents: { [key: string]: JSX.Element } = {
    "chronic-pain": <ChronicPain />,
    "anxiety": <Anxiety />,
    "complex-regional-pain-syndrome": <ComplexRegionalPainSyndrome />,
    "arthritis": <Arthritis />,
    "back-pain": <BackPain />,
    "neuropathic-pain": <NeuropathicPain />,
    "migraines": <Migraines />,
    "insomnia": <Insomnia />,
    "ptsd": <PTSD />,
    "epilepsy": <Epilepsy />,
    "multiple-sclerosis": <MultipleSclerosis />,
    "parkinsons": <Parkinsons />,
  };

  const component = conditionComponents[conditionId || ""];
  
  if (!component) {
    return <Navigate to="/conditions" replace />;
  }

  return component;
};

export default ConditionRouter;
