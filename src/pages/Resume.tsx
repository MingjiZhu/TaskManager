import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Collapse, Button, Row } from 'antd';
import styles from './Resume.less';

const { Text, Title, Link } = Typography;
const { Panel } = Collapse;

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <div>
          <Collapse defaultActiveKey={['objective', 'skills']}>
            <Panel header={<Title level={5}>Objective</Title>} key="objective">
              <Text>Full-time software developer position starting from May 2021 which allows an opportunity to grow and utilize my knowledge and skills.</Text>
            </Panel>
            <Panel header={<Title level={5}>Skills</Title>} key="skills">
              <li className={styles.li}>19+ months of experience developing web applications using <Text strong>JavaScript</Text> and <Text strong>React.js</Text></li>
              <li className={styles.li}>Debug application’s state changes using <Text strong>Redux DevTools</Text></li>
              <li className={styles.li}>Experience of Object-Oriented Programming (OOP) languages with <Text strong>C#, Python</Text> and <Text strong>Java</Text></li>
              <li className={styles.li}>Ability to develop and maintain new and existing web applications in <Text strong>ES6, TypeScript, HTML,</Text> and <Text strong>CSS</Text></li>
              <li className={styles.li}>Experience of using version control system such as <Text strong>Git</Text></li>
              <li className={styles.li}>Knowledge of <Text strong>HTTP1.1</Text> and <Text strong>RESTful web service</Text></li>
              <li className={styles.li}>Manage a database using MSSQL Server Management, MySQL and MS Access with VBA</li>
              <li className={styles.li}>Knowledge of automated unit and integration tests using Jest, Puppeteer and <Text strong>Selenium</Text></li>
            </Panel>
            <Panel header={<Title level={5}>Work History</Title>} key="workHistory">
              <Text strong>Front-end Developer (Capstone) 2021 - present</Text><br />
              <Text>weDstll -Toronto, Canada</Text>
              <li className={styles.li}>Build web applications using modern technologies such as <Text strong>React.js</Text> using <Text strong>Material-UI</Text></li>
              <li className={styles.li}>Manage application development with <Text strong>Azure DevOps Server</Text></li>
              <br />
              <Text strong>Front-end Developer (Co-op) 2019 - 2020</Text><br />
              <Text>A & L Canada Laboratories -London, Canada</Text>
              <li className={styles.li}>Designed and developed new and existing web applications with <Text strong>ES6</Text> and <Text strong>typescript</Text></li>
              <li className={styles.li}>Built complex applications using modern technologies such as <Text strong>React</Text> using <Text strong>Ant Design Pro</Text></li>
              <li className={styles.li}>Created modern front-end solutions based on provided <Text strong>RESTful APIs</Text></li>
              <li className={styles.li}>Troubleshoot, analyzed, and resolved performance bottlenecks</li>
              <li className={styles.li}>Participate in the automated unit, integration tests using Jest, Puppeteer, and <Text strong>Selenium</Text></li>
              <li className={styles.li}>Manage application development with <Text strong>Jira Software</Text></li>
              <li className={styles.li}>Wrote web applications user manual with Markdown</li>
              <br />
              <Text strong>Campaign Manager 2015 - 2017</Text><br />
              <Text>TechTarget -Beijing, China</Text>
              <li className={styles.li}>Managed and implemented B2B digital and website campaigns for multinational tech companies</li>
              <li className={styles.li}>Monitored, tracked, and analyzed user engagement/response data through TechTarget Data System to continuously improve the content promotion process</li>
              <li className={styles.li}>Developed custom campaign strategies based on customers requirements</li>
              <li className={styles.li}>Managed project team members and contract writers to ensure efficiency and effectiveness</li>
              <li className={styles.li}>Achieved project milestones through collaboration with colleagues in other global offices</li>
              <li className={styles.li}>Analyzed internal metrics to continuously plan and implement workflow improvements</li>
              <br />
              <Text strong>Project Manager Assistant 2013-2015</Text><br />
              <Text>Beijing Automotive Working Company-Beijing, China</Text>
              <li className={styles.li}>Worked with the product engineering team to improve and develop new project technology</li>
              <li className={styles.li}>Coordinated with associated departments to resolve quality and engineering issues</li>
              <li className={styles.li}>Collected and documented changes to component specifications and work order notification</li>
              <li className={styles.li}>Tracked and managed project progress from various departments via daily reports and meetings</li>
              <li className={styles.li}>Provided translations support and localization assistance for internatinal technical experts</li>
            </Panel>
            <Panel header={<Title level={5}>Projects</Title>} key="projects">
              <Link href={`/task`} strong>Task Manager</Link>
              <li className={styles.li}>Application is using <Text strong>React.js</Text> and <Text strong>TypeScript</Text></li>
              <li className={styles.li}>Allow user to manage tasks and view analytical dashboard</li>
              <br />
              <Link href="https://github.com/MingjiZhu/MusicStore" target="_blank" strong>Music Store</Link>
              <li className={styles.li}>Application is using <Text strong>ASP.NET Core</Text> and <Text strong>C#</Text></li>
              <li className={styles.li}>Allow user to purchase and download music</li>
              <br />
              <Link href="https://github.com/MingjiZhu/InstgramCheckFollowers" target="_blank" strong>Check Followers</Link>
              <li className={styles.li}>Application is using <Text strong>Flask</Text> and <Text strong>Python</Text></li>
              <li className={styles.li}>Allow Instgram user to check if following user is following back or not</li>
              <br />
              <Link href="https://github.com/MingjiZhu/CheckCheapestFlightTickets" target="_blank" strong>Check Cheapest Flight</Link>
              <li className={styles.li}>Application is using <Text strong>ASP.NET Core</Text> and <Text strong>C#</Text></li>
              <li className={styles.li}>Allow user to check cheapest flight tickets in <Text strong>real time</Text></li>
            </Panel>
            <Panel header={<Title level={5}>Education</Title>} key="education">
              <Text strong>Computer Programmer/Analyst Co-op Advanced Diploma 2018 - present</Text><br />
              <Text>Conestoga College, Kitchener, ON</Text>
              <li className={styles.li}>Dean’s Honors List</li>
              <li className={styles.li}>Scholarship Awards</li>
              <li className={styles.li}>Nominated for a Conestoga Co-op Student of the Year Award</li>
              <br />
              <Text strong>Bachelor of Languages-English 2009 - 2013</Text><br />
              <Text>Dalian University of Foreign Languages, Dalian, China</Text>
            </Panel>
          </Collapse>
        </div>
        <div className={styles.button}>
          <Button type="primary"><a href="MingjiZhu_Resume.pdf" target="_blank" download> Download Resume</a></Button>
        </div>
      </Card>
    </PageContainer >
  );
};
