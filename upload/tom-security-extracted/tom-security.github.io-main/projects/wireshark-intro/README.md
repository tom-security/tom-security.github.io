#  Analyse réseau – Introduction à Wireshark

Ce projet présente mes premières analyses réseau réalisées avec Wireshark.  
L’objectif est de comprendre comment observer le trafic, identifier les protocoles et analyser les échanges.

---

##  Objectifs du projet
- Comprendre la structure d’une capture réseau (.pcap)
- Identifier les protocoles utilisés (HTTP, DNS, TLS…)
- Utiliser les filtres Wireshark pour isoler des paquets
- Différencier trafic chiffré et non chiffré
- Extraire des informations utiles d’une capture

---

##  Exemple d’analyse : Handshake TLS
Dans cette analyse, j’ai observé un début de connexion HTTPS.

### 🔹 Ce que j’ai identifié
- Le **Client Hello**
- Les **versions TLS proposées**
- Les **cipher suites**
- Le **SNI (Server Name Indication)** permettant de voir le nom du site contacté

### 🔹 Ce que j’ai appris
- Même si le trafic est chiffré, certaines métadonnées restent visibles
- Le SNI permet d’identifier le domaine visé
- Le handshake TLS montre comment le client et le serveur négocient la sécurité

---

##  Filtres Wireshark utilisés
- `tls.handshake`
- `http`
- `dns`
- `ip.addr == x.x.x.x`
- `tcp.port == 443`

---

##  Conclusion
Cette première analyse m’a permis de mieux comprendre comment fonctionne une communication réseau et comment Wireshark permet d’observer les échanges en détail.

D’autres analyses plus avancées arriveront bientôt.
