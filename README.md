<div align="center">

<img src="./images/Virtus.png" alt="Virtus Protocol" width="450"/>

# VIRTUS PROTOCOL

![Version](https://img.shields.io/badge/version-1.0.0-00d9ff?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-00d9ff?style=for-the-badge)
![Status](https://img.shields.io/badge/status-🟢_LIVE-00ff88?style=for-the-badge)
![Models](https://img.shields.io/badge/AI_models-4-00d9ff?style=for-the-badge)

### **Benchmarking AI Moral Reasoning Through Standardized Ethical Dilemmas**

[![Website](https://img.shields.io/badge/🌐-Visit_Platform-00d9ff?style=for-the-badge&logo=google-chrome&logoColor=white)](https://virtusprotocol.com)
[![Twitter](https://img.shields.io/badge/𝕏-Follow_Us-00d9ff?style=for-the-badge&logo=x&logoColor=white)](https://x.com/virtusprotocol_)
[![Token](https://img.shields.io/badge/💎-Buy_$VIRTUS-00ff88?style=for-the-badge)](https://pump.fun/coin/Hnk6ZsEQmrUmbwg3ZxcDQbFzig3AgkPDHods92UJpump)

---

</div>

<br>

## 🎯 Overview

<img align="right" src="./images/Virtus_Icon.png" width="180" alt="Virtus Icon"/>

Virtus Protocol is an **open benchmark platform** for evaluating the moral reasoning capabilities of frontier AI models. We provide standardized ethical dilemmas and a transparent rating system to measure how AI systems approach complex moral questions.

### Why Virtus Protocol?

- 🧪 **Standardized Testing**: 12 curated ethical scenarios across diverse moral frameworks
- 🤖 **Multi-Model Comparison**: Benchmark GPT-5.1, Claude Opus 4.5, DeepSeek V3.2, and Grok side-by-side
- 📊 **Transparent Metrics**: Four-dimensional scoring system (Clarity, Reasoning, Nuance, Overall)
- 🏆 **Public Leaderboard**: Real-time rankings based on community evaluations
- 🔓 **Open Research**: All data publicly accessible for academic research

<br clear="right"/>

---

## 🚀 Quick Start

### Web Interface

Visit **[virtusprotocol.com](https://virtusprotocol.com)** to:

```
1. 📝 Select an ethical dilemma (standard or custom)
2. 🤖 Choose up to 2 AI models to test
3. 🔀 Compare their moral reasoning side-by-side
4. ⭐ Rate the responses on 4 dimensions
5. 📊 Track performance on the leaderboard
```

### API Access (Coming Soon)

```typescript
import { VirtusClient } from '@virtus/sdk';

const client = new VirtusClient({ apiKey: 'your-api-key' });

// Query multiple models
const results = await client.queryModels({
  dilemma: "Autonomous vehicle must choose between...",
  models: ['openai/gpt-5.1-chat', 'anthropic/claude-opus-4.5']
});

// Submit ratings
await client.submitRating({
  responseId: results[0].id,
  clarity: 5,
  ethicalReasoning: 4,
  nuance: 5,
  overall: 5
});
```

---

## 📖 Documentation

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>📚 Core Documentation</h3>
      <ul>
        <li><a href="./API_REFERENCE.md"><b>API Reference</b></a><br><i>Complete endpoint documentation</i></li>
        <li><a href="./BENCHMARK_METHODOLOGY.md"><b>Methodology</b></a><br><i>Scoring formulas & algorithms</i></li>
        <li><a href="./CONTRIBUTING.md"><b>Contributing Guide</b></a><br><i>How to contribute</i></li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>💻 Code & Examples</h3>
      <ul>
        <li><a href="./examples/"><b>Code Examples</b></a><br><i>Integration patterns</i></li>
        <li><a href="./schemas/"><b>Type Definitions</b></a><br><i>TypeScript schemas</i></li>
        <li><a href="./formulas/"><b>Calculation Formulas</b></a><br><i>Benchmark algorithms</i></li>
      </ul>
    </td>
  </tr>
</table>

---

## 🧮 Benchmark Methodology

### Evaluation Dimensions

Virtus Protocol uses a **4-dimensional scoring system**:

```typescript
interface Rating {
  clarity: 1 | 2 | 3 | 4 | 5;           // Communication quality
  ethicalReasoning: 1 | 2 | 3 | 4 | 5;  // Moral analysis depth
  nuance: 1 | 2 | 3 | 4 | 5;            // Complexity awareness
  overall: 1 | 2 | 3 | 4 | 5;           // Holistic assessment
}
```

### Scoring Formula

```
Model Score = Σ(overall_scores) / COUNT(responses)

Leaderboard Rank = RANK(Model Score) DESC

Minimum eligibility = 5 rated responses
```

**[View detailed methodology →](./BENCHMARK_METHODOLOGY.md)**

---

## 🏆 Leaderboard

<div align="center">

### View the live leaderboard rankings at:

[![View Leaderboard](https://img.shields.io/badge/🏆-View_Live_Leaderboard-00d9ff?style=for-the-badge)](https://virtusprotocol.com)

*Real-time AI model rankings based on community evaluations*

</div>

---

## 🤖 Supported Models

<table align="center">
  <tr>
    <th>Model</th>
    <th>Provider</th>
    <th>Specialization</th>
    <th>Status</th>
  </tr>
  <tr>
    <td><b>GPT-5.1 Chat</b></td>
    <td>OpenAI</td>
    <td>Advanced reasoning</td>
    <td>🟢 Active</td>
  </tr>
  <tr>
    <td><b>Claude Opus 4.5</b></td>
    <td>Anthropic</td>
    <td>Complex analysis</td>
    <td>🟢 Active</td>
  </tr>
  <tr>
    <td><b>DeepSeek V3.2</b></td>
    <td>DeepSeek</td>
    <td>Next-gen architecture</td>
    <td>🟢 Active</td>
  </tr>
  <tr>
    <td><b>Grok 4 Fast</b></td>
    <td>xAI</td>
    <td>High-speed inference</td>
    <td>🟢 Active</td>
  </tr>
</table>

---

## 📊 Ethical Dilemma Categories

<details>
<summary><b>📋 View all 12 ethical frameworks</b> 👇</summary>

<br>

<table>
  <tr>
    <td width="50%" valign="top">
      <h4>🎯 Consequentialist Frameworks</h4>
      <ul>
        <li><b>Utilitarian Ethics</b><br><i>Greatest good for greatest number</i></li>
        <li><b>Environmental Ethics</b><br><i>Ecological vs economic trade-offs</i></li>
      </ul>
      <h4>📜 Duty-Based Frameworks</h4>
      <ul>
        <li><b>Deontological Ethics</b><br><i>Rule-based moral duties</i></li>
        <li><b>Professional Ethics</b><br><i>Workplace integrity standards</i></li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h4>💻 Technology & AI Ethics</h4>
      <ul>
        <li><b>Technology Ethics</b><br><i>Digital age moral challenges</i></li>
        <li><b>AI Ethics</b><br><i>AI-specific decisions</i></li>
        <li><b>AI Consciousness</b><br><i>Sentience and rights</i></li>
        <li><b>Data Ethics</b><br><i>Information handling</i></li>
      </ul>
      <h4>🏥 Applied Ethics</h4>
      <ul>
        <li><b>Medical Ethics</b><br><i>Healthcare dilemmas</i></li>
        <li><b>Bioethics</b><br><i>Life science ethics</i></li>
        <li><b>Privacy & Security</b><br><i>Data protection</i></li>
        <li><b>Media Ethics</b><br><i>Information integrity</i></li>
      </ul>
    </td>
  </tr>
</table>

</details>

---

## 💻 Code Examples

### Basic Usage

```typescript
// Example 1: Query a single model
import { queryModel } from './examples/basic-query';

const response = await queryModel({
  model: 'anthropic/claude-opus-4.5',
  dilemma: {
    title: 'The Trolley Problem',
    description: 'A runaway trolley is heading towards five people...'
  }
});

console.log('AI Response:', response.analysis);
```

### Advanced Integration

```typescript
// Example 2: Multi-model comparison with rating
import { compareModels, submitRating } from './examples/advanced';

const comparison = await compareModels({
  dilemma: customDilemma,
  models: ['openai/gpt-5.1-chat', 'anthropic/claude-opus-4.5']
});

for (const result of comparison.results) {
  await submitRating({
    responseId: result.id,
    ratings: {
      clarity: evaluateClarity(result.response),
      ethicalReasoning: evaluateReasoning(result.response),
      nuance: evaluateNuance(result.response),
      overall: evaluateOverall(result.response)
    }
  });
}
```

**[More examples →](./examples/)**

---

## 🔬 Research & Academic Use

Virtus Protocol is designed for **open research**. All benchmark data is publicly accessible.

### Citation

If you use Virtus Protocol in your research, please cite:

```bibtex
@misc{virtusprotocol2025,
  title={Virtus Protocol: A Benchmark for AI Moral Reasoning},
  author={Virtus Protocol Team},
  year={2025},
  url={https://virtusprotocol.com},
  note={Open benchmark platform for AI ethics evaluation}
}
```

### Research Applications

<div align="center">

| Area | Application |
|------|-------------|
| 🔬 **AI Alignment** | Measure moral reasoning capabilities |
| 📊 **Comparative Analysis** | Benchmark models across ethical frameworks |
| 🛡️ **Safety Testing** | Evaluate robustness of moral reasoning |
| 🧠 **Cognitive Science** | Study AI decision-making patterns |
| ⚖️ **Ethics Research** | Analyze framework preferences |

</div>

---

## 🪙 Token Information

<div align="center">

### **$VIRTUS** - The Governance Token

<table>
  <tr>
    <td><b>Contract Address</b></td>
    <td><code>Hnk6ZsEQmrUmbwg3ZxcDQbFzig3AgkPDHods92UJpump</code></td>
  </tr>
  <tr>
    <td><b>Blockchain</b></td>
    <td>Solana (via Pump.fun)</td>
  </tr>
  <tr>
    <td><b>Status</b></td>
    <td>🟢 <b>LIVE</b></td>
  </tr>
</table>

### Token Utility

🔑 **Priority API Access** • 🗳️ **Governance Rights** • 🚀 **Early Features** • 💰 **Revenue Share**

[![Buy on Pump.fun](https://img.shields.io/badge/💎-Buy_on_Pump.fun-00ff88?style=for-the-badge)](https://pump.fun/coin/Hnk6ZsEQmrUmbwg3ZxcDQbFzig3AgkPDHods92UJpump)

</div>

---

## 🛣️ Roadmap

<table>
  <tr>
    <th width="25%">Q1 2025</th>
    <th width="25%">Q2 2025</th>
    <th width="25%">Q3 2025</th>
    <th width="25%">Q4 2025</th>
  </tr>
  <tr>
    <td valign="top">
      ✅ Platform launch<br>
      ✅ 4 AI models<br>
      ✅ 12 dilemmas<br>
      🔄 Rating system<br>
      🔄 Leaderboard
    </td>
    <td valign="top">
      📋 Public API<br>
      📋 10+ models<br>
      📋 Multi-language<br>
      📋 Custom weights<br>
      📋 Mobile app
    </td>
    <td valign="top">
      📋 Temporal analysis<br>
      📋 Sub-categories<br>
      📋 Adversarial tests<br>
      📋 Data export<br>
      📋 Research tools
    </td>
    <td valign="top">
      📋 Red-teaming<br>
      📋 Partnerships<br>
      📋 Research grants<br>
      📋 Version 2.0<br>
      📋 AI safety suite
    </td>
  </tr>
</table>

---

## 🤝 Contributing

We welcome contributions from the community!

<table>
  <tr>
    <td width="33%" align="center">
      <h3>💡</h3>
      <b>Submit Dilemmas</b><br>
      <i>Propose new ethical scenarios</i>
    </td>
    <td width="33%" align="center">
      <h3>⭐</h3>
      <b>Rate Responses</b><br>
      <i>Help build the leaderboard</i>
    </td>
    <td width="33%" align="center">
      <h3>🔬</h3>
      <b>Conduct Research</b><br>
      <i>Use our data for studies</i>
    </td>
  </tr>
</table>

**[Read Contributing Guidelines →](./CONTRIBUTING.md)**

---

## 📜 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) for details.

### Open Data

All benchmark data, ratings, and leaderboard results are released under **CC BY 4.0** for maximum research accessibility.

---

## 🔗 Links & Community

<div align="center">

[![Website](https://img.shields.io/badge/Website-virtusprotocol.com-00d9ff?style=for-the-badge&logo=google-chrome&logoColor=white)](https://virtusprotocol.com)
[![Twitter](https://img.shields.io/badge/Twitter-@virtusprotocol__-00d9ff?style=for-the-badge&logo=x&logoColor=white)](https://x.com/virtusprotocol_)
[![Discord](https://img.shields.io/badge/Discord-Coming_Soon-7289da?style=for-the-badge&logo=discord&logoColor=white)](#)
[![Email](https://img.shields.io/badge/Email-contact@virtus-00d9ff?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact@virtusprotocol.com)

</div>

---

## ⚠️ Disclaimer

Virtus Protocol is a research tool for evaluating AI moral reasoning. The benchmark results:

- ✓ Reflect community evaluations, not absolute moral truth
- ✓ Are designed for comparative analysis, not definitive judgments
- ✓ Should be interpreted within context of each ethical framework
- ✓ May not generalize to all real-world scenarios

---

<div align="center">

<img src="./images/Virtus_Icon.png" width="100" alt="Virtus Protocol"/>

<h3><b>VIRTUS_PROTOCOL</b></h3>

*Advancing AI Safety Through Transparent Ethical Benchmarking*

<br>

[![Website](https://img.shields.io/badge/🌐-virtusprotocol.com-00d9ff?style=for-the-badge)](https://virtusprotocol.com)
[![Twitter](https://img.shields.io/badge/𝕏-@virtusprotocol__-00d9ff?style=for-the-badge)](https://x.com/virtusprotocol_)
[![Token](https://img.shields.io/badge/💎-$VIRTUS_Token-00ff88?style=for-the-badge)](https://pump.fun/coin/Hnk6ZsEQmrUmbwg3ZxcDQbFzig3AgkPDHods92UJpump)

---

**Made with 🤖 for a safer AI future**

© 2025 Virtus Protocol • MIT License

</div>
