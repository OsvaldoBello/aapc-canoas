# Directives and Business Rules for SAP & WMW Automation

## SAP Business One - Commission Regions (IB_CO_REGIAO)
- **Representante / Consultor PJ (Offboarding & Onboarding)**: The field to update in table `IB_CO_REGIAO` is ONLY `U_IB_CodCom1`. During offboarding of a Representante, set `U_IB_CodCom1 = "RH2020"`. Do NOT alter `U_IB_CodCom3`.
- **Supervisor (Offboarding & Onboarding)**: The field to update in table `IB_CO_REGIAO` is `U_IB_CodCom3`. During offboarding of a Supervisor, set `U_IB_CodCom3 = "RH2020"`. Do NOT alter `U_IB_CodCom1`.
- **Preserve OSLP / OCRD Integrity**: Never set `Active = "tNO"` directly on `SalesPersons` in SAP, as this breaks foreign key references in Business Partners (`OCRD`). Maintain `Active = "tYES"` and update `Remarks` to `Região Comercial: RH2020 (Desligado)`.

## UBD Learning.rocks
- User list endpoint `/workspace/v2/users` returns data wrapped in a `"results"` list. `find_user_by_email` must check `data.get("results")`.

## WMW Vendas Web
- Form consultation filtering (`formConsulta`) defaults `flAtivo` to `"S"`. Before searching users to disable, `flAtivo` must be set to `""` (Todos) so both active and inactive users are queryable.

## Microsoft 365 / Entra ID - Grupos Padrões por Setor (Onboarding)
- **Regra Padrão Global**: Todo colaborador recebe `Grupo Bondmann` (`bd.grupo@bondmann.com.br`). Se for perfil Interno, também recebe `Bondmann Interno` (`bd.interno@bondmann.com.br`).
- **Grupos Padrões Catalogados por Setor**:
  1. **Financeiro**: `Bondmann Interno`, `Devoluções`, `Financeiro` (Financeiro@...), `Financeiro` (bd.financeiro@...), `Grupo Bondmann`
  2. **Marketing**: `Bondmann Interno`, `Grupo Bondmann`, `Marketing`
  3. **Comercial**: `Agenda Sala de Reuniões`, `Bondmann Interno`, `Comercial Interno`, `Devoluções`, `Grupo Bondmann`, `Não expedido`, `Não expedidos SP`, `Representantes`, `RS Interno`
  4. **Compras**: `Bondmann Interno`, `Compras`, `Controle de Entregas`, `Grupo Bondmann`, `Palavra chave compras e-commerce (Mecado Livre, Shopee...)`
  5. **TI**: `Bondmann Interno`, `Grupo Bondmann`, `TI`
  6. **Laboratório / Químico**: `Anomalias`, `Bondmann Interno`, `Fábrica`, `Grupo Bondmann`, `Laboratório`, `Químicos`
  7. **Fábrica**: `Bondmann Interno`, `Fábrica`, `Grupo Bondmann`, `Não expedido`, `RS Interno`
  8. **Controladoria**: `Agenda Sala de Reuniões`, `Bondmann Interno`, `Contábil`, `Controladoria`, `CTE01`, `CTE02`, `Devoluções`, `Faturamento`, `Financeiro` (bd.financeiro@...), `Grupo Bondmann`, `Logistica`, `NFe`, `NFe - Indaiatuba/SP`, `NFs de Serviço`, `RH & Contábil`
  9. **Recepção**: `Agenda Ernani`, `Agenda Richard`, `Agenda Sala de Reuniões`, `Agenda William`, `Bondmann`, `Bondmann Interno`, `Comitê Gestão`, `Fábrica`, `Grupo Bondmann`
- **Listas de Distribuição Exchange**: Grupos com `groupTypes: []` (ex: `quimico@...`, `bd.rs@...`, `anomalias@...`, `nfe@...`) geram erro 400 se adicionados via Graph API direta (`/members/$ref`), devendo ser sincronizados via Exchange admin ou tratados de forma resiliente pelo orquestrador.

## SAP Business One - Usuários Internos (Onboarding)
- **Filiais Padrão (MT e SP)**: Novos usuários internos recebem automaticamente as filiais MT (`BPLID = 1`, `MT_Bondmann Quimica LTDA`) e SP (`BPLID = 3`, `SP_Bondmann Quimica LTDA`) via coleção `UserBranchAssignment` na Service Layer. Em atualizações/reativações, somente as filiais faltantes são enviadas para evitar o erro `ODBC -2035`.
- **Modelos de Configuração de IU (User Groups)**: Novos usuários internos são automaticamente vinculados ao grupo de usuários `Colaboradores - Modelos UI` (`UserGroupId = 1`, tipo `gc_UITmplate`) via coleção `UserGroupByUser` (`USERId` e `GroupId`), herdando os 8 modelos de layout de formulário da empresa.

