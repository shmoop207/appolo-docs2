import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function Feature({title, description, icon, image}) {
	return (
		<div className={clsx(styles.feature, "col col-3")}>
			<div className={styles.top}>
				{icon ? <i className="material-icons">{icon}</i> : null}
				{image ? <img src={image}/> : null}
				<h3>{title}</h3>
			</div>
			<p>{description}</p>
		</div>
	);
}

const tabs = [{value: "node", label: "Node"}, {value: "webpack", label: "Webpack"}];

function Home() {
	const context = useDocusaurusContext();
	const {siteConfig = {}} = context;
	return (
		<Layout
			description={siteConfig.tagline}>
			<div className="home">
				
				<header className={clsx(styles.header, "container")}>
					<img className={styles.badge} src="https://img.shields.io/npm/v/@appolo/core?style=for-the-badge"/>
					<div className="row">
						<div className="col col-6">
							<h2>Node.js framework
								for building high performance scalable
								server side applications</h2>
							<h3>
								Appolo provides clean and modern architecture which allows developers to build highly
								testable, scalable, loosely coupled, and easily maintainable applications</h3>
							<Link to="docs/introduction" className={styles.button}>Get Started</Link>
							<a href="https://github.com/shmoop207/appolo"
							   className={clsx(styles.button, styles.outline)}>View Source</a>
						</div>
						<div className={clsx(styles.image, "col col-6")}>
							{/* <img src="img/undraw_developer_activity_bv83.svg" /> */}
							{/* <img src="img/undraw_Freelancer_re_irh4.svg" /> */}
							<img src="img/undraw_coding_6mjf.svg"/>
							{/* <img src="img/undraw_programming_2svr.svg" /> */}
						</div>
					</div>
				</header>
				<main className="container">
					<h2>The right way to write TypeScript applications</h2>
					<div className={clsx(styles.features, "row")}>
						<Feature icon="flare" title="Simple" description="Define and reuse modules and dependencies."/>
						<Feature icon="emoji_flags" title="Performance"
						         description="Built from the ground up for performance and scale."/>
						<Feature icon="settings_input_component" title="Modular"
						         description="easily extend your application with custom modules."/>
						<Feature icon="category" title="Organized"
						         description="Better project code organization approach."/>
					
					</div>
					<div className={clsx(styles.features, "row")}>
						<Feature image="img/typescript.svg" title="For TypeScript"
						         description="Built with latest JavaScript features using TypeScript."/>
						<Feature icon="build" title="Dependency Injection"
						         description="Powered by powerful Dependency injection makes your code elegant, easy to maintain and test."/>
						<Feature icon="account_tree" title="Zero external dependencies"
						         description="All appollo core modules build for performance with zero external dependencies"/>
						<Feature icon="code" title="Developer Friendly"
						         description="Built for developer joy without sacrificing performance and stability."/>
					</div>
				</main>
				<main className="container">
					<h2>The fastest way to get started</h2>
					<p>
						Checkout the <Link to="/docs/overview/examples/">examples</Link> page for full examples and use
						cases.
					</p>
					<div className="row">
						
						<div className={clsx(styles.code, "col col-6")}>
							
							<p>Install using npm or yarn</p>
							<div className={styles.example}>
								<div className={styles.code}>
									<CodeBlock className="bash">
										npm i --save @appolo/core
									</CodeBlock>
								</div>
							</div>
							<br/>
							
							<p>Create app</p>
							
							<div className={styles.example}>
								<div className={styles.code}>
									<CodeBlock>
										{`import { App } from "@appolo/node";

await App.create().launch();`}
									</CodeBlock></div>
							</div>
							<br/>
							
							<p>Define your controllers</p>
							<div className={styles.example}>
								<div className={styles.code}>
									<CodeBlock className="ts">
										{`import { define, singleton, inject,factory,alias } from "@applo/inject";
import { controller, post,body } from "@applo/route"

@controller("/api/v1")
export class MailController {

  @inject() private mailService:MailService;

  @post("/send_mail")
  public async sendMail(@body() mail: Mail) {
    return mailProvider.send(message);
  }
}
`}
</CodeBlock></div>
</div><br/><p>Define your services</p>
<div className={styles.example}>
<div className={styles.code}>
<CodeBlock>{`
@define()
@singleton()
export class MailService {

  @inject() private mailProvider:IMailProvider;

  public async send(message: Mail) {
    await mailProvider.send(message);
  }
}`}
									</CodeBlock></div>
							</div><br/><p>Define your factories</p>
							<div className={styles.example}>
								<div className={styles.code}>
									<CodeBlock>{`
@factory()
export class MailProvider {

  @inject() private env:IEnv;
  @alias("IMailProvider") private mailProviders:IMailProvider[]};

  public async get(message: Mail) {
    return this.mailProviders.find(provider=>provider.type==this.env.mailProvider);
  }
}
`}
									</CodeBlock>
									<p style={{marginTop: 10}}>Checkout the <Link to="/docs/overview/examples">more
										examples</Link></p>
								</div>
							</div>
						
						</div>
					</div>
				</main>
				
				<main className="container" style={{marginTop:0}}>
					<div className={styles.end} style={{marginTop:0}}>
						<div className={styles.credits} style={{marginTop:0}}>
							{/*<img src="img/appolo_fav.ico"/> <i className="material-icons">add</i> */}
							{/*<img*/}
							{/*src="img/typescript.svg"/>*/}
							<Link style={{marginLeft:"20px"}} className={styles.button} to="/docs/getting-started">Get Started</Link>
							<a href="https://github.com/shmoop207/appolo" className={clsx(styles.button, styles.outline)}>View
								Source</a>
						</div>
						{/*<h2>Appolo changes the way you write TypeScript applications</h2>*/}
						
					</div>
				</main>
			
			</div>
		</Layout>
	);
}

export default Home;
