// client/src/app/routes/AppRoutes.tsx

import {
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import ScrollToTop from "../../components/routing/ScrollToTop";

import {
  CASE_STUDY_ROUTES,
  COURSE_ROUTES,
  ROUTES,
  THEORY_ROUTES,
} from "../../constants/routes";

import {
  CourseProgressProvider,
} from "../providers/CourseProgressProvider";

import CaseStudyPage from "../../pages/CaseStudyPage";
import CaseStudyAssessmentPage from "../../pages/CaseStudyAssessmentPage";
import CaseStudyResultsPage from "../../pages/CaseStudyResultsPage";
import CaseStudySetupPage from "../../pages/CaseStudySetupPage";
import CourseLessonPage from "../../pages/CourseLessonPage";
import CoursePage from "../../pages/CoursePage";
import DashboardPage from "../../pages/DashboardPage";
import GlossaryPage from "../../pages/GlossaryPage";
import GuidedImprovementAnalysisPage from "../../pages/GuidedImprovementAnalysisPage";
import LandingPage from "../../pages/LandingPage";
import LessonQuizPage from "../../pages/LessonQuizPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import SectionFinalTestPage from "../../pages/SectionFinalTestPage";
import SimulationPage from "../../pages/SimulationPage";
import TheoryLessonPage from "../../pages/TheoryLessonPage";
import TheoryPage from "../../pages/TheoryPage";

import CaseStudyRouteGuard from "./CaseStudyRouteGuard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path={
            ROUTES.landing
          }
          element={
            <LandingPage />
          }
        />

        <Route
          path={
            ROUTES.login
          }
          element={
            <LoginPage />
          }
        />

        <Route
          path={
            ROUTES.register
          }
          element={
            <RegisterPage />
          }
        />

        <Route
        element={
          <ProtectedRoute />
        }
      >
        <Route
          element={
            <CourseProgressProvider>
              <AppLayout />
            </CourseProgressProvider>
          }
        >
            <Route
              path={
                ROUTES.dashboard
              }
              element={
                <DashboardPage />
              }
            />

            {/* Guided Course overview */}
            <Route
              path={
                ROUTES.courses
              }
              element={
                <CoursePage />
              }
            />

            {/* Guided Course lesson */}
            <Route
              path={
                COURSE_ROUTES
                  .lessonPath
              }
              element={
                <CourseLessonPage />
              }
            />

            {/* Formative lesson quiz */}
            <Route
              path={
                COURSE_ROUTES
                  .quizPath
              }
              element={
                <LessonQuizPage />
              }
            />

            {/* Section final test */}
            <Route
              path={
                COURSE_ROUTES
                  .finalTestPath
              }
              element={
                <SectionFinalTestPage />
              }
            />

            {/* Theory Library */}
            <Route
              path={
                ROUTES.theory
              }
              element={
                <TheoryPage />
              }
            />

            <Route
              path={
                THEORY_ROUTES
                  .lessonPath
              }
              element={
                <TheoryLessonPage />
              }
            />

            {/* Case Study overview */}
            <Route
              path={
                CASE_STUDY_ROUTES
                  .home
              }
              element={
                <CaseStudyPage />
              }
            />

            {/*
             * Building Information
             *
             * This is the first Case Study stage.
             * It requires only an unlocked Case
             * Study.
             */}
            <Route
              element={
                <CaseStudyRouteGuard
                  stage="setup"
                />
              }
            >
              <Route
                path={
                  CASE_STUDY_ROUTES
                    .setup
                }
                element={
                  <CaseStudySetupPage />
                }
              />
            </Route>

            {/*
             * Service Assessment
             *
             * Requires completed Building
             * Information.
             */}
            <Route
              element={
                <CaseStudyRouteGuard
                  stage="assessment"
                />
              }
            >
              <Route
                path={
                  CASE_STUDY_ROUTES
                    .assessment
                }
                element={
                  <CaseStudyAssessmentPage />
                }
              />
            </Route>

            {/*
             * Results and Results Investigation
             *
             * Requires completed Service
             * Assessment and a baseline result.
             */}
            <Route
              element={
                <CaseStudyRouteGuard
                  stage="results"
                />
              }
            >
              <Route
                path={
                  CASE_STUDY_ROUTES
                    .results
                }
                element={
                  <CaseStudyResultsPage />
                }
              />
            </Route>

            {/*
             * Guided Improvement Analysis
             *
             * Requires completed Assessment
             * Results Investigation.
             */}
            <Route
              element={
                <CaseStudyRouteGuard
                  stage="guided-improvement-analysis"
                />
              }
            >
              <Route
                path={
                  CASE_STUDY_ROUTES
                    .guidedImprovementAnalysis
                }
                element={
                  <GuidedImprovementAnalysisPage />
                }
              />
            </Route>

            {/*
             * Comparison & Interpretation
             *
             * Requires a completed simulation.
             */}
            <Route
              element={
                <CaseStudyRouteGuard
                  stage="simulation-results"
                />
              }
            >
              <Route
                path={
                  CASE_STUDY_ROUTES
                    .simulationResults
                }
                element={
                  <SimulationPage />
                }
              />
            </Route>

            {/* Glossary */}
            <Route
              path={
                ROUTES.glossary
              }
              element={
                <GlossaryPage />
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;