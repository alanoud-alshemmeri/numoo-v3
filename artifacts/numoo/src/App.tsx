import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Splash from "@/pages/index";
import Privacy from "@/pages/privacy";
import AgeSelection from "@/pages/age";
import Screening from "@/pages/screening";
import Loading from "@/pages/loading";
import Results from "@/pages/results";
import Centers from "@/pages/centers";
import Chatbot from "@/pages/chatbot";
import About from "@/pages/about";
import Sources from "@/pages/sources";
import Library from "@/pages/library";
import LibraryArticle from "@/pages/library-article";
import ResultsDoctorQuestions from "@/pages/results-doctor-questions";
import ResultsFamilyTalk from "@/pages/results-family-talk";
import Results30DayPlan from "@/pages/results-30-day-plan";
import GovSupport from "@/pages/gov-support";
import DoctorsPage from "@/pages/doctors";
import AssessmentCentersPage from "@/pages/assessment-centers";
import RestorePage from "@/pages/restore";
import ReportTranslator from "@/pages/report-translator";
import VisualSchedule from "@/pages/visual-schedule";
import Aac from "@/pages/aac";
import Judges from "@/pages/judges";
import Printables from "@/pages/printables";
import PrintableDetail from "@/pages/printable-detail";
import ForMom from "@/pages/for-mom";
import Onboarding from "@/pages/onboarding";
import VisitPrep from "@/pages/visit-prep";
import { TextSizeProvider } from "@/components/text-size-provider";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/age" component={AgeSelection} />
      <Route path="/screening" component={Screening} />
      <Route path="/loading" component={Loading} />
      <Route path="/results" component={Results} />
      <Route path="/results/doctor-questions" component={ResultsDoctorQuestions} />
      <Route path="/results/family-talk" component={ResultsFamilyTalk} />
      <Route path="/results/30-day-plan" component={Results30DayPlan} />
      <Route path="/centers" component={Centers} />
      <Route path="/chatbot" component={Chatbot} />
      <Route path="/about" component={About} />
      <Route path="/sources" component={Sources} />
      <Route path="/library" component={Library} />
      <Route path="/library/:id" component={LibraryArticle} />
      <Route path="/gov-support" component={GovSupport} />
      <Route path="/doctors" component={DoctorsPage} />
      <Route path="/assessment-centers" component={AssessmentCentersPage} />
      <Route path="/restore" component={RestorePage} />
      <Route path="/report-translator" component={ReportTranslator} />
      <Route path="/visual-schedule" component={VisualSchedule} />
      <Route path="/aac" component={Aac} />
      <Route path="/judges" component={Judges} />
      <Route path="/printables" component={Printables} />
      <Route path="/printables/:id" component={PrintableDetail} />
      <Route path="/for-mom" component={ForMom} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/results/visit-prep" component={VisitPrep} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TextSizeProvider />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
