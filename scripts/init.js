const { changeJsonSync, cwd, changeFileSync, exec } = require('./util');
const readlineSync = require('readline-sync');

let params = process.argv.slice(2);

if (!params.length) {
  const res = readlineSync
    .question(
      '请输入 <name|包名> ## <author|作者> ## <description|描述>\n\n例如： my-prj ## smooth-cat ## a awsome project\n\n'
    )
    .split('##')
    .map(it => it.trim());
  if (!res[0]) {
    console.log('未找到包名🤡~');
    process.exit(0);
  }
  params = res;
}

const [name, author, description] = params;

changeJsonSync(cwd('./package.json'), data => {
  const version = '0.0.1';
  const keyWords = [name, ...name.split('-')];

  const repoReg = /git\@(.*):([^\n]+).git/;
  let repo = '';
  let domain = '';
  let path = '';
  try {
    const res = exec('git remote -v') || '';
    const match = res.match(repoReg);

    if (match) {
      repo = match[0] || '';
      domain = match[1] || '';
      path = match[2] || '';
    }
  } catch (error) {
    console.log('repo not exist');
  }

  const repoHome = `https://${domain}/${path}`;

  const repoProps = repo
    ? {
        repository: {
          type: 'git',
          url: `git+${repo}`
        },
        bugs: {
          url: `${repoHome}/issues`
        },
        homepage: `${repoHome}#readme`
      }
    : {};

  return {
    ...data,
    version,
    ...repoProps,
    keyWords,
    name,
    author,
    description
  };
});

changeFileSync(cwd('./README.md'), data => {
  return data.replace(/#[^\n]+/, data => `# ${name}`);
});

changeFileSync(cwd('./webpack.config.js'), data => {
  return data.replace('___umd___', name.split('-').map(it => it.toUpperCase()).join(''));
})

console.log('初始化项目成功🤡~');
