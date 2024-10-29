﻿// ------------------------------------------------------------------------------
//  <auto-generated>
//      This code was generated by SpecFlow (https://www.specflow.org/).
//      SpecFlow Version:3.9.0.0
//      SpecFlow Generator Version:3.9.0.0
// 
//      Changes to this file may cause incorrect behavior and will be lost if
//      the code is regenerated.
//  </auto-generated>
// ------------------------------------------------------------------------------
#region Designer generated code
#pragma warning disable
namespace CDAServiceApiTests.Features
{
    using TechTalk.SpecFlow;
    using System;
    using System.Linq;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "3.9.0.0")]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [NUnit.Framework.TestFixtureAttribute()]
    [NUnit.Framework.DescriptionAttribute("CDA Pei API Test Without RPT Authorization")]
    [NUnit.Framework.IgnoreAttribute("Ignored feature")]
    public partial class CDAPeiAPITestWithoutRPTAuthorizationFeature
    {
        
        private TechTalk.SpecFlow.ITestRunner testRunner;
        
        private string[] _featureTags = new string[] {
                "Ignore"};
        
#line 1 "CdaPeisWithOutAuthorisation.feature"
#line hidden
        
        [NUnit.Framework.OneTimeSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Features", "CDA Pei API Test Without RPT Authorization", "API Tests with RPT Authorization as per policy on Service Emulator. To Test on Lo" +
                    "cal use localhost in place of Azure QA Environment.", ProgrammingLanguage.CSharp, new string[] {
                        "Ignore"});
            testRunner.OnFeatureStart(featureInfo);
        }
        
        [NUnit.Framework.OneTimeTearDownAttribute()]
        public virtual void FeatureTearDown()
        {
            testRunner.OnFeatureEnd();
            testRunner = null;
        }
        
        [NUnit.Framework.SetUpAttribute()]
        public virtual void TestInitialize()
        {
        }
        
        [NUnit.Framework.TearDownAttribute()]
        public virtual void TestTearDown()
        {
            testRunner.OnScenarioEnd();
        }
        
        public virtual void ScenarioInitialize(TechTalk.SpecFlow.ScenarioInfo scenarioInfo)
        {
            testRunner.OnScenarioInitialize(scenarioInfo);
            testRunner.ScenarioContext.ScenarioContainer.RegisterInstanceAs<NUnit.Framework.TestContext>(NUnit.Framework.TestContext.CurrentContext);
        }
        
        public virtual void ScenarioStart()
        {
            testRunner.OnScenarioStart();
        }
        
        public virtual void ScenarioCleanup()
        {
            testRunner.CollectScenarioErrors();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Get Request without RPT & Valid inputs")]
        [NUnit.Framework.CategoryAttribute("smoke")]
        [NUnit.Framework.CategoryAttribute("cdapei")]
        public virtual void GetRequestWithoutRPTValidInputs()
        {
            string[] tagsOfScenario = new string[] {
                    "smoke",
                    "cdapei"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Get Request without RPT & Valid inputs", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 6
this.ScenarioInitialize(scenarioInfo);
#line hidden
            bool isScenarioIgnored = default(bool);
            bool isFeatureIgnored = default(bool);
            if ((tagsOfScenario != null))
            {
                isScenarioIgnored = tagsOfScenario.Where(__entry => __entry != null).Where(__entry => String.Equals(__entry, "ignore", StringComparison.CurrentCultureIgnoreCase)).Any();
            }
            if ((this._featureTags != null))
            {
                isFeatureIgnored = this._featureTags.Where(__entry => __entry != null).Where(__entry => String.Equals(__entry, "ignore", StringComparison.CurrentCultureIgnoreCase)).Any();
            }
            if ((isScenarioIgnored || isFeatureIgnored))
            {
                testRunner.SkipScenario();
            }
            else
            {
                this.ScenarioStart();
#line 7
 testRunner.Given("user sends request to \'Azure QA Environment\' endpoint \'without\' RPT authorization" +
                        "", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
#line 8
 testRunner.Then("response is all ok with response code as \'Unauthorized\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            }
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Get Request without RPT with various invalid inputs")]
        [NUnit.Framework.CategoryAttribute("regression")]
        [NUnit.Framework.CategoryAttribute("cdapei")]
        [NUnit.Framework.TestCaseAttribute("b7301d11-f166-499a-9bf1-0598c2f1af51x", "0cbe2fcf-4332-4018-a42b-ad2488a810b6", "BadRequest", null)]
        [NUnit.Framework.TestCaseAttribute("b7301d11-f166-499a-9bf1-0598c2f1af2", "0cbe2fcf-4332-4018-a42b-ad2488a810b6", "BadRequest", null)]
        [NUnit.Framework.TestCaseAttribute("", "0cbe2fcf-4332-4018-a42b-ad2488a810b6", "BadRequest", null)]
        [NUnit.Framework.TestCaseAttribute("b7301d11-f166-499a-9bf1-0598c2f1af54", "", "NotFound", null)]
        [NUnit.Framework.TestCaseAttribute("b7301d11-f166-499a-9bf1-0598c2f1af54", "11111111-1111-1111-1111-1111111111112", "BadRequest", null)]
        [NUnit.Framework.TestCaseAttribute("b7301d11-f166-499a-9bf1-0598c2f1af55", "0cbe2fcf-4332-4018-a42b-ad2488a810", "BadRequest", null)]
        [NUnit.Framework.TestCaseAttribute("b7301d11-f166-499a-9bf1-0598c2f1af57", "!\"£$%^&-*()-2345-6789-012345678901", "BadRequest", null)]
        public virtual void GetRequestWithoutRPTWithVariousInvalidInputs(string x_Request_ID, string pEISID, string statusCode, string[] exampleTags)
        {
            string[] @__tags = new string[] {
                    "regression",
                    "cdapei"};
            if ((exampleTags != null))
            {
                @__tags = System.Linq.Enumerable.ToArray(System.Linq.Enumerable.Concat(@__tags, exampleTags));
            }
            string[] tagsOfScenario = @__tags;
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            argumentsOfScenario.Add("X-Request-ID", x_Request_ID);
            argumentsOfScenario.Add("PEISID", pEISID);
            argumentsOfScenario.Add("StatusCode", statusCode);
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Get Request without RPT with various invalid inputs", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 12
this.ScenarioInitialize(scenarioInfo);
#line hidden
            bool isScenarioIgnored = default(bool);
            bool isFeatureIgnored = default(bool);
            if ((tagsOfScenario != null))
            {
                isScenarioIgnored = tagsOfScenario.Where(__entry => __entry != null).Where(__entry => String.Equals(__entry, "ignore", StringComparison.CurrentCultureIgnoreCase)).Any();
            }
            if ((this._featureTags != null))
            {
                isFeatureIgnored = this._featureTags.Where(__entry => __entry != null).Where(__entry => String.Equals(__entry, "ignore", StringComparison.CurrentCultureIgnoreCase)).Any();
            }
            if ((isScenarioIgnored || isFeatureIgnored))
            {
                testRunner.SkipScenario();
            }
            else
            {
                this.ScenarioStart();
#line 13
 testRunner.Given(string.Format("user sends request to \'Azure QA Environment\' endpoint \'with\' RPT authorization wi" +
                            "th request as \'{0}\' with peisid as \'{1}\'", x_Request_ID, pEISID), ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
#line 14
 testRunner.Then(string.Format("response is all ok with response code as \'{0}\'", statusCode), ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            }
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion