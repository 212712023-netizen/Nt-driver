const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('.nav-btn');
const recordDate = document.getElementById('record-date');
const incomeUberValue = document.getElementById('income-value-uber');
const income99Value = document.getElementById('income-value-99');
const expenseFuelValue = document.getElementById('expense-fuel-value');
const expenseFoodValue = document.getElementById('expense-food-value');
const expenseOilValue = document.getElementById('expense-oil-value');
const expenseWashValue = document.getElementById('expense-wash-value');
const expenseOtherValue = document.getElementById('expense-other-value');
const kmInput = document.getElementById('km-value');
const hoursInput = document.getElementById('hours-worked');
const saveRecordButton = document.getElementById('save-record');
const saveGoalButton = document.getElementById('save-goal');
const recordsTable = document.getElementById('records-table');
const appToastEl = document.getElementById('app-toast');
const appShellEl = document.getElementById('app-shell');
const authGateEl = document.getElementById('auth-gate');
const authTabs = document.querySelectorAll('.auth-tab');
const authLoginForm = document.getElementById('auth-login-form');
const authRegisterForm = document.getElementById('auth-register-form');
const authForgotForm = document.getElementById('auth-forgot-form');
const authResetForm = document.getElementById('auth-reset-form');
const openForgotFormButton = document.getElementById('open-forgot-form-btn');
const backToLoginButton = document.getElementById('back-to-login-btn');
const openResetManualButton = document.getElementById('open-reset-manual-btn');
const authMessageEl = document.getElementById('auth-message');
const currentUserNameEl = document.getElementById('current-user-name');
const logoutButton = document.getElementById('logout-btn');
const adminUsersNavButton = document.getElementById('admin-users-nav-btn');
const adminCreateUserForm = document.getElementById('admin-create-user-form');
const adminCreateNameInput = document.getElementById('admin-create-name');
const adminCreateEmailInput = document.getElementById('admin-create-email');
const adminCreatePasswordInput = document.getElementById('admin-create-password');
const adminCreateIsAdminInput = document.getElementById('admin-create-is-admin');
const adminUsersListEl = document.getElementById('admin-users-list');
const adminUsersMessageEl = document.getElementById('admin-users-message');
const openPasswordModalButton = document.getElementById('open-password-modal-btn');
const passwordModalEl = document.getElementById('password-modal');
const closePasswordModalButton = document.getElementById('close-password-modal-btn');
const passwordForm = document.getElementById('password-form');
const passwordMessageEl = document.getElementById('password-message');
const currentPasswordInput = document.getElementById('current-password-input');
const newPasswordInput = document.getElementById('new-password-input');
const confirmPasswordInput = document.getElementById('confirm-password-input');

let dashboardMonthlyIncome = 0;
let editingRecordId = null;
let isSavingRecord = false;
let hasBootstrappedApp = false;
let currentSessionUser = null;
let publicRegisterEnabled = false;

const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const totalProfitEl = document.getElementById('total-profit');
const dashboardReminderCardEl = document.getElementById('dashboard-reminder-card');
const dashboardReminderTitleEl = document.getElementById('dashboard-reminder-title');
const dashboardReminderTextEl = document.getElementById('dashboard-reminder-text');
const monthSelect = document.getElementById('month-select');
const historyMonthSelect = document.getElementById('history-month-select');
const summaryMonthSelect = document.getElementById('summary-month-select');
const dashboardTotalEl = document.getElementById('dashboard-total');
const dashboardProfitEl = document.getElementById('dashboard-profit');
const goalMessageEl = document.getElementById('goal-message');
const dashboardGastosEl = document.getElementById('dashboard-gastos');
const summaryMonthlyGoalEl = document.getElementById('summary-monthly-goal');
const monthIncomeEl = document.getElementById('month-income');
const monthProfitEl = document.getElementById('month-profit');
const monthUberEl = document.getElementById('month-uber');
const month99El = document.getElementById('month-99');
const expenseFuelEl = document.getElementById('expense-fuel');
const expenseFoodEl = document.getElementById('expense-food');
const expenseOilEl = document.getElementById('expense-oil');
const expenseWashEl = document.getElementById('expense-wash');
const expenseOtherEl = document.getElementById('expense-other');
const monthlyGoalInput = document.getElementById('monthly-goal-input');
const monthlyGoalEl = document.getElementById('monthly-goal');
const goalResultEl = document.getElementById('goal-result');
const goalResultPercentEl = document.getElementById('goal-result-percent');
const goalRateEl = document.getElementById('goal-rate');
const goalRemainingEl = document.getElementById('goal-remaining');
const goalRemainingPercentEl = document.getElementById('goal-remaining-percent');
const goalRemainingRateEl = document.getElementById('goal-remaining-rate');
const dashboardTotalSideEl = document.getElementById('dashboard-total-side');
const summarySaldoCardEl = document.getElementById('summary-saldo-card');
const dashboardProfitSideEl = document.getElementById('dashboard-profit-side');
const dashboardGastosSideEl = document.getElementById('dashboard-gastos-side');
const summaryMonthlyGoalSideEl = document.getElementById('summary-monthly-goal-side');
const summaryGoalsListEl = document.getElementById('summary-goals-list');
const sidebarKmEl = document.getElementById('sidebar-km');
const personalDescriptionInput = document.getElementById('personal-description');
const personalAmountInput = document.getElementById('personal-amount');
const personalDueDayInput = document.getElementById('personal-due-day');
const personalInstallmentsInput = document.getElementById('personal-installments');
const personalTypeSelect = document.getElementById('personal-type');
const personalCategorySelect = document.getElementById('personal-category');
const personalAccountSelect = document.getElementById('personal-account');
const personalStatusSelect = document.getElementById('personal-status');
const personalDateInput = document.getElementById('personal-date');
const addPersonalExpenseButton = document.getElementById('add-personal-expense');
const personalEntryDescriptionInput = document.getElementById('personal-entry-description');
const personalEntryAmountInput = document.getElementById('personal-entry-amount');
const personalEntryCategorySelect = document.getElementById('personal-entry-category');
const personalCategorySuggestionsEl = document.getElementById('personal-category-suggestions');
const personalEntryDueDayInput = document.getElementById('personal-entry-due-day');
const personalEntryInstallmentsInput = document.getElementById('personal-entry-installments');
const personalEntryFixedSelect = document.getElementById('personal-entry-fixed');
const personalEntryStatusSelect = document.getElementById('personal-entry-status');
const personalTableAddButton = document.getElementById('personal-table-add');
const personalTabButtons = document.querySelectorAll('.personal-tab-btn');
const personalTabPanels = document.querySelectorAll('.personal-tab-panel');
const personalFilterMonth = document.getElementById('personal-filter-month');
const personalIncomesEl = document.getElementById('personal-incomes');
const personalExpensesTotalEl = document.getElementById('personal-expenses-total');
const personalPaidEl = document.getElementById('personal-paid');
const personalPendingEl = document.getElementById('personal-pending');
const personalExpensesList = document.getElementById('personal-expenses-list');
const personalExpensesFooter = document.getElementById('personal-expenses-footer');
const sidebarHoursEl = document.getElementById('sidebar-hours');
const performanceKmEl = document.getElementById('performance-km');
const performanceHoursEl = document.getElementById('performance-hours');
const performanceIncomeEl = document.getElementById('performance-income');
const performanceProfitEl = document.getElementById('performance-profit');
const performanceUberEl = document.getElementById('performance-uber');
const performance99El = document.getElementById('performance-99');
const performanceDayIncomeEl = document.getElementById('performance-day-income');
const performanceDayExpenseEl = document.getElementById('performance-day-expense');
const performanceDayProfitEl = document.getElementById('performance-day-profit');
const performanceDaysWorkedEl = document.getElementById('performance-days-worked');
const performanceWeekIncomeEl = document.getElementById('performance-week-income');
const performanceWeekExpenseEl = document.getElementById('performance-week-expense');
const performanceWeekProfitEl = document.getElementById('performance-week-profit');
const performanceWeeksWorkedEl = document.getElementById('performance-weeks-worked');
const performanceWeekSelect = document.getElementById('performance-week-select');
const performanceKmIncomeEl = document.getElementById('performance-km-income');
const performanceKmExpenseEl = document.getElementById('performance-km-expense');
const performanceKmProfitEl = document.getElementById('performance-km-profit');
const performanceKmTotalEl = document.getElementById('performance-km-total');
const performanceHourIncomeEl = document.getElementById('performance-hour-income');
const performanceHourExpenseEl = document.getElementById('performance-hour-expense');
const performanceHourProfitEl = document.getElementById('performance-hour-profit');
const performanceHoursTotalEl = document.getElementById('performance-hours-total');
const performanceTabButtons = document.querySelectorAll('.performance-tab-btn');
const performancePanels = document.querySelectorAll('.performance-panel');
const performanceWeekTabButton = document.getElementById('performance-week-tab');

const MONTHLY_GOAL_KEY = 'nt-driver-monthly-goal';
const PERSONAL_EXPENSES_KEY = 'nt-driver-personal-expenses';
const PERSONAL_EXPENSES_MIGRATED_KEY = 'nt-driver-personal-expenses-migrated';
const SUMMARY_DAILY_GOALS_KEY = 'nt-driver-summary-daily-goals';
const SUMMARY_DAILY_GOALS_RESET_FLAG_KEY = 'nt-driver-summary-daily-goals-reset-v2';
const ACTIVE_PAGE_KEY = 'nt-driver-active-page';
const ACTIVE_PERFORMANCE_TAB_KEY = 'nt-driver-active-performance-tab';
const ACTIVE_PERSONAL_TAB_KEY = 'nt-driver-active-personal-tab';
const PERSONAL_CATEGORY_SUGGESTIONS_KEY_PREFIX = 'nt-driver-personal-category-suggestions';
const PERSONAL_CATEGORY_SUGGESTIONS_LIMIT = 30;

let personalExpensesCache = [];

const PERSONAL_CATEGORY_LABELS = {
  alimentacao: 'Alimentação',
  casa: 'Casa',
  servicos: 'Serviços',
  carro: 'Carro',
  emprestimo: 'Empréstimo',
  dividas: 'Dívidas',
  'renegociacao-dividas': 'Renegociação de dívidas',
  educacao: 'Educação',
  'corte-cabelo': 'Corte de cabelo',
  presentes: 'Presentes',
  lazer: 'Lazer',
  'gastos-extras': 'Gastos extras',
  saude: 'Saúde',
  internet: 'Internet',
  outros: 'Outros'
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

const parseCurrencyInput = (value) => {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).trim().replace(/\./g, '').replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const normalizePersonalCategory = (value) => {
  const raw = String(value || '').trim();
  if (!raw) return 'Outros';

  const normalizedLower = raw.toLocaleLowerCase('pt-BR');
  const keyMatch = Object.keys(PERSONAL_CATEGORY_LABELS)
    .find((key) => key.toLocaleLowerCase('pt-BR') === normalizedLower);
  if (keyMatch) return PERSONAL_CATEGORY_LABELS[keyMatch];

  const labelMatch = Object.values(PERSONAL_CATEGORY_LABELS)
    .find((label) => label.toLocaleLowerCase('pt-BR') === normalizedLower);
  if (labelMatch) return labelMatch;

  return raw;
};

const getPersonalCategorySuggestionsStorageKey = () => {
  if (!currentSessionUser || currentSessionUser.isAdmin) return null;
  const userScope = currentSessionUser?.id ? String(currentSessionUser.id) : 'anon';
  return `${PERSONAL_CATEGORY_SUGGESTIONS_KEY_PREFIX}-${userScope}`;
};

const getDefaultPersonalCategorySuggestions = () => {
  const unique = new Set(Object.values(PERSONAL_CATEGORY_LABELS));
  return Array.from(unique);
};

const getStoredPersonalCategorySuggestions = () => {
  const storageKey = getPersonalCategorySuggestionsStorageKey();
  if (!storageKey) return [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => normalizePersonalCategory(entry))
      .filter((entry) => Boolean(entry));
  } catch (error) {
    return [];
  }
};

const setStoredPersonalCategorySuggestions = (entries) => {
  const storageKey = getPersonalCategorySuggestionsStorageKey();
  if (!storageKey) return;
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify(Array.isArray(entries) ? entries.slice(0, PERSONAL_CATEGORY_SUGGESTIONS_LIMIT) : [])
    );
  } catch (error) {
    // Ignora falha de persistencia de sugestoes de categoria.
  }
};

const buildPersonalCategorySuggestions = (extraEntries = []) => {
  const isRegularUser = Boolean(currentSessionUser && !currentSessionUser.isAdmin);
  const combined = [
    ...(isRegularUser ? getStoredPersonalCategorySuggestions() : []),
    ...getDefaultPersonalCategorySuggestions(),
    ...(isRegularUser ? extraEntries : [])
  ]
    .map((entry) => normalizePersonalCategory(entry))
    .filter((entry) => Boolean(entry));

  const seen = new Set();
  const finalEntries = [];
  combined.forEach((entry) => {
    const key = entry.toLocaleLowerCase('pt-BR');
    if (seen.has(key)) return;
    seen.add(key);
    finalEntries.push(entry);
  });

  return finalEntries.slice(0, PERSONAL_CATEGORY_SUGGESTIONS_LIMIT);
};

const renderPersonalCategorySuggestions = (extraEntries = []) => {
  if (!personalCategorySuggestionsEl) return;
  const entries = buildPersonalCategorySuggestions(extraEntries);
  personalCategorySuggestionsEl.innerHTML = entries
    .map((entry) => `<option value="${escapeHtml(entry)}"></option>`)
    .join('');
};

const rememberPersonalCategorySuggestion = (entry) => {
  if (!currentSessionUser || currentSessionUser.isAdmin) return;
  const normalizedEntry = normalizePersonalCategory(entry);
  if (!normalizedEntry) return;
  const entries = buildPersonalCategorySuggestions([normalizedEntry]);
  setStoredPersonalCategorySuggestions(entries);
  renderPersonalCategorySuggestions(entries);
};

const coerceCategoryForCurrentUser = (value) => {
  const normalized = normalizePersonalCategory(value);
  if (!currentSessionUser || !currentSessionUser.isAdmin) return normalized;

  const validLabels = new Set(Object.values(PERSONAL_CATEGORY_LABELS).map((label) => label.toLocaleLowerCase('pt-BR')));
  return validLabels.has(normalized.toLocaleLowerCase('pt-BR')) ? normalized : 'Outros';
};

const setText = (element, value) => {
  if (element) element.textContent = value;
};

const setAuthMessage = (message = '', type = 'error') => {
  if (!authMessageEl) return;
  authMessageEl.textContent = message;
  authMessageEl.style.color = type === 'success' ? '#166534' : '#b91c1c';
};

const setAdminUsersMessage = (message = '', type = 'error') => {
  if (!adminUsersMessageEl) return;
  adminUsersMessageEl.textContent = message;
  adminUsersMessageEl.style.color = type === 'success' ? '#166534' : '#b91c1c';
};

const setPasswordMessage = (message = '', type = 'error') => {
  if (!passwordMessageEl) return;
  passwordMessageEl.textContent = message;
  passwordMessageEl.style.color = type === 'success' ? '#166534' : '#b91c1c';
};

const openPasswordModal = () => {
  passwordModalEl?.classList.remove('hidden');
  passwordModalEl?.setAttribute('aria-hidden', 'false');
  setPasswordMessage('');
};

const closePasswordModal = () => {
  passwordModalEl?.classList.add('hidden');
  passwordModalEl?.setAttribute('aria-hidden', 'true');
  if (passwordForm) passwordForm.reset();
  setPasswordMessage('');
};

const setAuthView = (view) => {
  authLoginForm?.classList.toggle('active', view === 'login');
  authRegisterForm?.classList.toggle('active', view === 'register');
  authForgotForm?.classList.toggle('active', view === 'forgot');
  authResetForm?.classList.toggle('active', view === 'reset');
};

const setAuthMode = (mode) => {
  authTabs.forEach((tab) => {
    const isActive = tab.dataset.authTab === mode;
    tab.classList.toggle('active', isActive);
    tab.disabled = tab.dataset.authTab === 'register' && !publicRegisterEnabled;
  });
  setAuthView(mode === 'register' && publicRegisterEnabled ? 'register' : 'login');
  setAuthMessage('');
};

const updateRegisterAvailabilityUi = () => {
  const registerTab = Array.from(authTabs).find((tab) => tab.dataset.authTab === 'register');
  if (registerTab) {
    registerTab.disabled = !publicRegisterEnabled;
    registerTab.title = publicRegisterEnabled ? '' : 'Cadastro fechado. Solicite acesso ao administrador.';
  }
};

const openAuthGate = () => {
  authGateEl?.classList.remove('hidden');
  appShellEl?.classList.add('app-shell-hidden');
};

const openAppShell = () => {
  authGateEl?.classList.add('hidden');
  appShellEl?.classList.remove('app-shell-hidden');
};

const applySessionUser = (user) => {
  currentSessionUser = user || null;
  const fallbackName = user?.email || '-';
  setText(currentUserNameEl, user?.name || fallbackName);
  if (adminUsersNavButton) {
    const isAdmin = Boolean(user?.isAdmin);
    adminUsersNavButton.classList.toggle('visible', isAdmin);
    if (!isAdmin && adminUsersNavButton.classList.contains('active')) {
      setActivePage('dashboard');
    }
  }
};

const apiFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (response.status === 401) {
    openAuthGate();
    setAuthMode('login');
    if (currentSessionUser || !appShellEl?.classList.contains('app-shell-hidden')) {
      setAuthMessage('Sua sessao expirou. Entre novamente.');
    } else {
      setAuthMessage('');
    }
    throw new Error('Sessao expirada.');
  }
  return response;
};

const refreshRegisterAvailability = async () => {
  try {
    const response = await fetch('/api/auth/register-status');
    const payload = await response.json().catch(() => ({}));
    publicRegisterEnabled = Boolean(payload?.publicRegisterEnabled);
  } catch (error) {
    publicRegisterEnabled = false;
  }
  updateRegisterAvailabilityUi();
};

const renderAdminUsers = (users) => {
  if (!adminUsersListEl) return;
  const list = Array.isArray(users) ? users : [];
  if (!list.length) {
    adminUsersListEl.innerHTML = '<tr><td colspan="5">Nenhum usuario cadastrado.</td></tr>';
    return;
  }

  adminUsersListEl.innerHTML = list
    .map((user) => {
      const isCurrentUser = Number(user.id) === Number(currentSessionUser?.id || 0);
      const actions = isCurrentUser
        ? '<span>Sua conta</span>'
        : `
            <button type="button" class="admin-reset-btn" data-user-id="${user.id}" data-user-email="${user.email || ''}">Resetar senha</button>
            <button type="button" class="admin-delete-btn" data-user-id="${user.id}" data-user-email="${user.email || ''}">Excluir</button>
          `;
      return `
        <tr>
          <td>${user.name || '-'}</td>
          <td>${user.email || '-'}</td>
          <td>${user.is_admin ? 'Admin' : 'Membro'}</td>
          <td>${String(user.created_at || '').slice(0, 10) || '-'}</td>
          <td>${actions}</td>
        </tr>
      `;
    })
    .join('');

  adminUsersListEl.querySelectorAll('.admin-reset-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = Number(button.dataset.userId || 0);
      const userEmail = String(button.dataset.userEmail || '').trim();
      if (!userId) return;

      const newPassword = window.prompt(`Nova senha para ${userEmail}:`);
      if (!newPassword) return;
      if (newPassword.length < 6) {
        setAdminUsersMessage('A senha deve ter no minimo 6 caracteres.');
        return;
      }

      const response = await apiFetch(`/api/auth/users/${userId}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setAdminUsersMessage(payload?.error || 'Falha ao resetar senha.');
        return;
      }

      setAdminUsersMessage('Senha resetada com sucesso.', 'success');
      showAppToast('Senha do usuario atualizada.');
    });
  });

  adminUsersListEl.querySelectorAll('.admin-delete-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = Number(button.dataset.userId || 0);
      const userEmail = String(button.dataset.userEmail || '').trim();
      if (!userId) return;

      const confirmed = window.confirm(`Tem certeza que deseja excluir o usuario ${userEmail}?`);
      if (!confirmed) return;

      const response = await apiFetch(`/api/auth/users/${userId}`, {
        method: 'DELETE'
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setAdminUsersMessage(payload?.error || 'Falha ao excluir usuario.');
        return;
      }

      setAdminUsersMessage('Usuario excluido com sucesso.', 'success');
      showAppToast('Usuario removido.');
      await loadAdminUsers();
    });
  });
};

const loadAdminUsers = async () => {
  if (!currentSessionUser?.isAdmin) return;
  const response = await apiFetch('/api/auth/users');
  const payload = await response.json().catch(() => []);
  if (!response.ok) {
    setAdminUsersMessage(payload?.error || 'Falha ao carregar usuarios.');
    return;
  }
  renderAdminUsers(payload);
};

const deleteRecordsByDate = async (date, options = {}) => {
  const { allowEmpty = false } = options;
  let deletedCount = 0;

  try {
    const encodedDate = encodeURIComponent(date);
    const response = await apiFetch(`/api/records/by-date/${encodedDate}`, { method: 'DELETE' });
    if (response.ok) {
      const payload = await response.json();
      deletedCount = Number(payload?.deleted || 0);
      if (deletedCount > 0) {
        return payload;
      }
    }
  } catch (error) {
    // Ignora erro da rota por data e segue para fallback por id.
  }

  // Fallback: find matching records by date string and delete by id
  const listResponse = await apiFetch('/api/records');
  if (!listResponse.ok) {
    if (allowEmpty) return { deleted: 0 };
    throw new Error('Falha ao carregar registros para exclusao.');
  }

  const allRecords = await listResponse.json();
  const matching = (allRecords || []).filter((record) => {
    const recordDate = String(record?.date || '').trim();
    return recordDate === date || recordDate.startsWith(date);
  });

  if (!matching.length) {
    if (allowEmpty) return { deleted: 0 };
    throw new Error('Nenhum registro foi encontrado para esta data.');
  }

  let deletedById = 0;
  for (const record of matching) {
    const deleteByIdResponse = await apiFetch(`/api/records/${record.id}`, { method: 'DELETE' });
    if (deleteByIdResponse.ok) {
      deletedById += 1;
    }
  }

  if (deletedById <= 0 && !allowEmpty) {
    throw new Error('Nao foi possivel remover os registros desta data.');
  }

  return { deleted: deletedById };
};

const setActivePerformanceTab = (tabId) => {
  const exists = Array.from(performancePanels).some((panel) => panel.dataset.performancePanel === tabId);
  const finalTabId = exists ? tabId : 'day';
  performancePanels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.performancePanel === finalTabId);
  });
  performanceTabButtons.forEach((button) => {
    const isActive = button.dataset.performanceTab === finalTabId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  try {
    localStorage.setItem(ACTIVE_PERFORMANCE_TAB_KEY, finalTabId);
  } catch (error) {
    // Ignora falha de persistencia da sub-aba ativa.
  }
};

const getSavedPerformanceTab = () => {
  try {
    const savedTab = localStorage.getItem(ACTIVE_PERFORMANCE_TAB_KEY);
    if (!savedTab) return 'day';
    const exists = Array.from(performancePanels).some((panel) => panel.dataset.performancePanel === savedTab);
    return exists ? savedTab : 'day';
  } catch (error) {
    return 'day';
  }
};

const formatPersonalCategory = (category) => PERSONAL_CATEGORY_LABELS[category] || category || 'Outros';

const personalDonutPercentagePlugin = {
  id: 'personalDonutPercentagePlugin',
  afterDatasetsDraw(chart) {
    const dataset = chart.data.datasets?.[0];
    const meta = chart.getDatasetMeta(0);
    if (!dataset || !meta?.data?.length) return;

    const values = dataset.data.map((value) => Number(value) || 0);
    const total = values.reduce((sum, value) => sum + value, 0);
    if (total <= 0) return;

    const ctx = chart.ctx;
    ctx.save();
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    meta.data.forEach((arc, index) => {
      const value = values[index];
      if (value <= 0) return;
      const percent = (value / total) * 100;
      if (percent < 5) return;

      if (percent >= 10) ctx.font = '700 9px Segoe UI';
      else if (percent >= 5) ctx.font = '700 8px Segoe UI';
      else ctx.font = '700 7px Segoe UI';
      const percentLabel = `${percent.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;

      const angle = (arc.startAngle + arc.endAngle) / 2;
      const radius = arc.innerRadius + ((arc.outerRadius - arc.innerRadius) * 0.62);
      const x = arc.x + Math.cos(angle) * radius;
      const y = arc.y + Math.sin(angle) * radius;
      ctx.fillText(percentLabel, x, y);
    });

    ctx.restore();
  }
};

const monthNames = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

const setMonthlyGoal = (value) => {
  if (!monthlyGoalInput) return;
  monthlyGoalInput.value = value;
  localStorage.setItem(MONTHLY_GOAL_KEY, value);
};

const showGoalMessage = (message) => {
  if (!goalMessageEl) return;
  goalMessageEl.textContent = message;
  goalMessageEl.classList.add('visible');
  clearTimeout(goalMessageEl.hideTimeout);
  goalMessageEl.hideTimeout = setTimeout(() => {
    goalMessageEl.classList.remove('visible');
  }, 2400);
};

const showAppToast = (message, tone = 'success') => {
  if (!appToastEl) return;
  appToastEl.textContent = message;
  appToastEl.classList.remove('error');
  if (tone === 'error') appToastEl.classList.add('error');
  appToastEl.classList.add('visible');
  clearTimeout(appToastEl.hideTimeout);
  appToastEl.hideTimeout = setTimeout(() => {
    appToastEl.classList.remove('visible');
  }, 2200);
};

const populateMonthSelect = () => {
  if (!monthSelect && !historyMonthSelect && !summaryMonthSelect) return;
  const now = new Date();
  const options = [];
  for (let i = 0; i < 12; i += 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = `${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
    options.push(`<option value="${value}">${label}</option>`);
  }
  if (monthSelect) monthSelect.innerHTML = options.join('');
  if (historyMonthSelect) historyMonthSelect.innerHTML = options.join('');
  if (summaryMonthSelect) summaryMonthSelect.innerHTML = options.join('');
  const currentMonth = getCurrentYearMonth();
  if (monthSelect) monthSelect.value = currentMonth;
  if (historyMonthSelect) historyMonthSelect.value = currentMonth;
  if (summaryMonthSelect) summaryMonthSelect.value = currentMonth;
};

const getSelectedMonth = () => {
  return monthSelect?.value || historyMonthSelect?.value || summaryMonthSelect?.value || getCurrentYearMonth();
};

const syncMonthSelectors = (value) => {
  if (!value) return;
  [monthSelect, historyMonthSelect, summaryMonthSelect].forEach((selector) => {
    if (selector && selector.value !== value) selector.value = value;
  });
};

const formatMonthYearSlash = (yearMonth) => {
  if (!yearMonth || !/^\d{4}-\d{2}$/.test(yearMonth)) return '';
  const [year, month] = yearMonth.split('-');
  return `${month}/${year}`;
};

const getWeekIndexInMonth = (dateString) => {
  if (!dateString) return 1;
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return 1;

  const firstDay = new Date(year, month - 1, 1);
  const firstWeekOffset = (firstDay.getDay() + 6) % 7; // Monday-based
  return Math.floor((firstWeekOffset + day - 1) / 7) + 1;
};

const getWeekRangeLabel = (yearMonth, weekIndex) => {
  if (!yearMonth || !weekIndex) return '';
  const [year, month] = yearMonth.split('-').map(Number);
  if (!year || !month) return '';

  const firstDay = new Date(year, month - 1, 1);
  const firstWeekOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();

  const start = Math.max(1, 1 - firstWeekOffset + ((weekIndex - 1) * 7));
  const end = Math.min(daysInMonth, start + 6);
  return `${String(start).padStart(2, '0')}-${String(end).padStart(2, '0')}/${String(month).padStart(2, '0')}`;
};

const getMonthlyGoal = () => {
  const stored = localStorage.getItem(MONTHLY_GOAL_KEY);
  return stored !== null ? Number(stored) : 10000;
};

const getPersonalExpenses = () => personalExpensesCache;

const loadPersonalExpenses = async () => {
  const response = await apiFetch('/api/personal-expenses');
  if (!response.ok) {
    personalExpensesCache = [];
    return [];
  }
  const items = await response.json();
  personalExpensesCache = Array.isArray(items) ? items : [];
  return personalExpensesCache;
};

const importLegacyPersonalExpensesIfNeeded = async () => {
  const alreadyMigrated = localStorage.getItem(PERSONAL_EXPENSES_MIGRATED_KEY) === '1';
  if (alreadyMigrated) return;

  if (personalExpensesCache.length > 0) {
    localStorage.setItem(PERSONAL_EXPENSES_MIGRATED_KEY, '1');
    return;
  }

  const raw = localStorage.getItem(PERSONAL_EXPENSES_KEY);
  if (!raw) {
    localStorage.setItem(PERSONAL_EXPENSES_MIGRATED_KEY, '1');
    return;
  }

  let parsedItems = [];
  try {
    parsedItems = JSON.parse(raw);
  } catch (error) {
    return;
  }

  if (!Array.isArray(parsedItems) || !parsedItems.length) {
    localStorage.setItem(PERSONAL_EXPENSES_MIGRATED_KEY, '1');
    return;
  }

  await savePersonalExpenses(parsedItems);
  localStorage.setItem(PERSONAL_EXPENSES_MIGRATED_KEY, '1');
  showAppToast('Despesas pessoais antigas importadas para sua conta.');
};

const getCurrentYearMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const formatDecimalPtBr = (value) =>
  Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

const getSummaryDailyGoalsStore = () => {
  try {
    const raw = localStorage.getItem(SUMMARY_DAILY_GOALS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
};

const saveSummaryDailyGoalsStore = (store) => {
  localStorage.setItem(SUMMARY_DAILY_GOALS_KEY, JSON.stringify(store || {}));
};

const getSummaryMonthDailyData = (yearMonth) => {
  const store = getSummaryDailyGoalsStore();
  return store[yearMonth] || {};
};

const setSummaryDayValues = (yearMonth, day, values) => {
  const store = getSummaryDailyGoalsStore();
  if (!store[yearMonth]) store[yearMonth] = {};

  const hasGoal = values?.goal !== null && values?.goal !== undefined;
  const hasDone = values?.done !== null && values?.done !== undefined;
  const hasDayOff = values?.dayOff !== null && values?.dayOff !== undefined;

  if (!hasGoal && !hasDone && !hasDayOff) {
    delete store[yearMonth][String(day)];
    if (Object.keys(store[yearMonth]).length === 0) {
      delete store[yearMonth];
    }
    saveSummaryDailyGoalsStore(store);
    return;
  }

  store[yearMonth][String(day)] = {
    goal: hasGoal ? Number(values.goal) : null,
    done: hasDone ? Number(values.done) : null,
    dayOff: hasDayOff ? Boolean(values.dayOff) : false
  };
  saveSummaryDailyGoalsStore(store);
};

const updateSummaryGoalsTotalsFromInputs = () => {
  if (!summaryGoalsListEl) return;
  let totalGoal = 0;
  let totalDone = 0;

  summaryGoalsListEl.querySelectorAll('.summary-goals-row').forEach((row) => {
    const goalInput = row.querySelector('.summary-goal-input');
    const doneInput = row.querySelector('.summary-done-input');
    const dayOffToggle = row.querySelector('.summary-dayoff-toggle');
    
    const isDayOff = dayOffToggle?.classList.contains('active') || false;
    const goalValue = parseCurrencyInput(goalInput?.value || 0);
    const doneValue = parseCurrencyInput(doneInput?.value || 0);
    
    row.classList.remove('goal-hit', 'goal-miss', 'goal-exceed-100', 'goal-miss-100', 'goal-dayoff');
    
    if (isDayOff) {
      row.classList.add('goal-dayoff');
      return;
    }
    
    if (goalValue <= 0 || doneValue <= 0) return;

    const diff = doneValue - goalValue;
    if (diff >= 100) {
      row.classList.add('goal-exceed-100');
    } else if (diff >= 0) {
      row.classList.add('goal-hit');
    } else if (diff <= -100) {
      row.classList.add('goal-miss-100');
    } else {
      row.classList.add('goal-miss');
    }
    
    totalGoal += goalValue;
    totalDone += doneValue;
  });

  const saldo = totalDone - totalGoal;
  const remaining = Math.max(0, getMonthlyGoal() - dashboardMonthlyIncome);

  setText(dashboardTotalSideEl, formatCurrency(saldo));
  setText(summaryMonthlyGoalEl, formatCurrency(totalGoal));
  setText(summaryMonthlyGoalSideEl, formatCurrency(totalDone));
  setText(dashboardProfitSideEl, formatCurrency(remaining));

  if (summarySaldoCardEl) {
    summarySaldoCardEl.classList.remove('saldo-positive', 'saldo-negative');
    if (saldo > 0) summarySaldoCardEl.classList.add('saldo-positive');
    if (saldo < 0) summarySaldoCardEl.classList.add('saldo-negative');
  }
};

const getDaysInMonth = (yearMonth) => {
  const [year, month] = (yearMonth || '').split('-').map(Number);
  if (!year || !month) return 30;
  return new Date(year, month, 0).getDate();
};

const getWeekdayName = (yearMonth, day) => {
  const [year, month] = (yearMonth || '').split('-').map(Number);
  if (!year || !month || !day) return '';
  const date = new Date(year, month - 1, day);
  const weekNames = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  return weekNames[date.getDay()] || '';
};

const getMonthDiff = (fromMonth, toMonth) => {
  if (!fromMonth || !toMonth) return 0;
  const [fromYear, fromMon] = fromMonth.split('-').map(Number);
  const [toYear, toMon] = toMonth.split('-').map(Number);
  if (!fromYear || !fromMon || !toYear || !toMon) return 0;
  return (toYear - fromYear) * 12 + (toMon - fromMon);
};

const getIsoWeekKey = (dateString) => {
  if (!dateString) return '';
  const parsed = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return '';

  const utcDate = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));
  const day = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day);

  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
  return `${utcDate.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

const parseInstallments = (rawInstallments) => {
  const raw = String(rawInstallments || '').trim();
  const match = raw.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) return null;
  const paid = Number(match[1]);
  const total = Number(match[2]);
  if (!Number.isFinite(paid) || !Number.isFinite(total) || total <= 0) return null;
  return { paid, total };
};

const normalizeInstallmentsForMonth = (item, targetMonth) => {
  const parsed = parseInstallments(item.installments);
  const raw = String(item.installments || '').trim();
  if (!parsed) return raw || '-';

  const { paid, total } = parsed;

  const startMonth = item.installments_start_month || item.date?.slice(0, 7) || targetMonth;
  const monthDiff = getMonthDiff(startMonth, targetMonth);
  const progressed = Math.max(0, Math.min(total, paid + monthDiff));
  return `${progressed}/${total}`;
};

const isPersonalExpenseVisibleInMonth = (item, selectedMonth) => {
  const installmentsInfo = parseInstallments(item.installments);
  if (!installmentsInfo) {
    if (!item.is_fixed) {
      return String(item.date || '').startsWith(selectedMonth);
    }
    const startMonth = item.date?.slice(0, 7) || selectedMonth;
    return getMonthDiff(startMonth, selectedMonth) >= 0;
  }

  const startMonth = item.installments_start_month || item.date?.slice(0, 7) || selectedMonth;
  const monthDiff = getMonthDiff(startMonth, selectedMonth);
  if (monthDiff < 0) return false;

  const progressed = Math.max(installmentsInfo.paid, Math.min(installmentsInfo.total, installmentsInfo.paid + monthDiff));
  return progressed <= installmentsInfo.total;
};

const getPersonalExpenseReminderLabel = (item) => {
  const description = String(item.description || '').trim();
  if (description) return description;
  if (item.account) return String(item.account).trim();
  return formatPersonalCategory(item.category);
};

const renderDashboardDueReminders = () => {
  if (!dashboardReminderCardEl || !dashboardReminderTitleEl || !dashboardReminderTextEl) return;

  const today = new Date();
  const todayDay = today.getDate();
  const currentMonth = getCurrentYearMonth();
  const dueTodayItems = getPersonalExpenses()
    .filter((item) => item.type === 'saida')
    .filter((item) => item.status !== 'pago')
    .filter((item) => isPersonalExpenseVisibleInMonth(item, currentMonth))
    .filter((item) => Number(item.due_day || Number((item.date || '').slice(8, 10)) || 0) === todayDay)
    .sort((a, b) => String(getPersonalExpenseReminderLabel(a)).localeCompare(String(getPersonalExpenseReminderLabel(b)), 'pt-BR'));

  dashboardReminderCardEl.classList.toggle('is-empty', dueTodayItems.length === 0);

  if (!dueTodayItems.length) {
    dashboardReminderTitleEl.textContent = 'Lembrete de vencimentos';
    dashboardReminderTextEl.textContent = 'Nenhuma conta vencendo hoje nas despesas pessoais.';
    return;
  }

  dashboardReminderTitleEl.textContent = dueTodayItems.length === 1
    ? 'Tem 1 conta vencendo hoje'
    : `Tem ${dueTodayItems.length} contas vencendo hoje`;

  dashboardReminderTextEl.textContent = dueTodayItems
    .map((item) => `${getPersonalExpenseReminderLabel(item)} vencendo hoje`)
    .join(' • ');
};

const populatePersonalMonthFilter = () => {
  if (!personalFilterMonth) return;
  const now = new Date();
  const options = [];
  for (let offset = -2; offset <= 12; offset += 1) {
    const date = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = `${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
    options.push(`<option value="${value}">${label}</option>`);
  }
  personalFilterMonth.innerHTML = options.join('');
  personalFilterMonth.value = getCurrentYearMonth();
};

let personalEditingId = null;

const setActivePersonalTab = (tabId) => {
  const exists = Array.from(personalTabPanels).some((panel) => panel.dataset.personalPanel === tabId);
  const finalTabId = exists ? tabId : 'overview';
  personalTabButtons.forEach((button) => {
    const isActive = button.dataset.personalTab === finalTabId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  personalTabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.personalPanel === finalTabId);
  });
  try {
    localStorage.setItem(ACTIVE_PERSONAL_TAB_KEY, finalTabId);
  } catch (error) {
    // Ignora falha de persistencia da sub-aba ativa.
  }
};

const getSavedPersonalTab = () => {
  try {
    const savedTab = localStorage.getItem(ACTIVE_PERSONAL_TAB_KEY);
    if (!savedTab) return 'overview';
    const exists = Array.from(personalTabPanels).some((panel) => panel.dataset.personalPanel === savedTab);
    return exists ? savedTab : 'overview';
  } catch (error) {
    return 'overview';
  }
};

const getPersonalExpenseInput = (override = {}) => {
  const source = override.source || 'form';
  const description = override.description ?? (source === 'table'
    ? personalEntryDescriptionInput?.value.trim() || ''
    : personalDescriptionInput?.value.trim() || '');
  const amount = override.amount ?? (parseCurrencyInput(source === 'table'
    ? personalEntryAmountInput?.value
    : personalAmountInput?.value) || 0);
  const type = override.type ?? ((source === 'table'
    ? personalTypeSelect?.value
    : personalTypeSelect?.value) || 'saida');
  const category = coerceCategoryForCurrentUser(override.category ?? ((source === 'table'
    ? personalEntryCategorySelect?.value
    : personalCategorySelect?.value) || 'Outros'));
  const account = override.account ?? ((source === 'table'
    ? personalAccountSelect?.value
    : personalAccountSelect?.value) || 'outros');
  const status = override.status ?? ((source === 'table'
    ? personalEntryStatusSelect?.value
    : personalStatusSelect?.value) || 'pendente');
  const dueDayRaw = override.due_day ?? ((source === 'table'
    ? personalEntryDueDayInput?.value
    : personalDueDayInput?.value) || '');
  const installments = override.installments ?? ((source === 'table'
    ? personalEntryInstallmentsInput?.value.trim() || ''
    : personalInstallmentsInput?.value.trim() || ''));
  let isFixed = override.is_fixed;
  if (isFixed === undefined) {
    if (source === 'table') {
      const fixedValue = personalEntryFixedSelect?.value;
      if (fixedValue === 'sim') isFixed = true;
      else if (fixedValue === 'nao') isFixed = false;
      else isFixed = null;
    } else {
      isFixed = false;
    }
  }
  if (installments) {
    isFixed = null;
  }
  const date = override.date ?? ((source === 'table'
    ? personalDateInput?.value
    : personalDateInput?.value) || new Date().toISOString().slice(0, 10));
  const dueDayNumber = Number(dueDayRaw);
  const dateDay = Number((date || '').slice(8, 10)) || 1;
  const dueDay = Number.isFinite(dueDayNumber) && dueDayNumber >= 1 && dueDayNumber <= 31 ? dueDayNumber : dateDay;
  return { description, amount, type, category, account, status, date, due_day: dueDay, installments, is_fixed: isFixed };
};

const savePersonalExpenses = async (items) => {
  const response = await apiFetch('/api/personal-expenses/replace', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: Array.isArray(items) ? items : [] })
  });

  if (!response.ok) {
    throw new Error('Falha ao salvar despesas pessoais.');
  }

  const payload = await response.json().catch(() => ({}));
  personalExpensesCache = Array.isArray(payload?.items) ? payload.items : [];
  return true;
};

const renderPersonalExpenses = () => {
  const allItems = getPersonalExpenses();
  renderPersonalCategorySuggestions();
  const selectedMonth = personalFilterMonth?.value || getCurrentYearMonth();
  const monthContext = selectedMonth;
  const items = allItems.filter((item) => isPersonalExpenseVisibleInMonth(item, selectedMonth));
  const sortedItems = [...items].sort((a, b) => {
    const dayA = Number(a.due_day || Number((a.date || '').slice(8, 10)) || 99);
    const dayB = Number(b.due_day || Number((b.date || '').slice(8, 10)) || 99);
    if (dayA !== dayB) return dayA - dayB;

    const dateA = String(a.date || '');
    const dateB = String(b.date || '');
    if (dateA !== dateB) return dateA.localeCompare(dateB);

    return String(a.description || '').localeCompare(String(b.description || ''), 'pt-BR');
  });
  const expenses = allItems.filter((item) => item.type === 'saida');
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalPaid = expenses
    .filter((item) => item.status === 'pago')
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const totalPending = expenses
    .filter((item) => item.status !== 'pago')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  if (personalIncomesEl) personalIncomesEl.textContent = formatCurrency(dashboardMonthlyIncome);
  if (personalExpensesTotalEl) personalExpensesTotalEl.textContent = formatCurrency(totalExpenses);
  if (personalPaidEl) personalPaidEl.textContent = formatCurrency(totalPaid);
  if (personalPendingEl) personalPendingEl.textContent = formatCurrency(totalPending);

  if (!personalExpensesList) return;
  personalExpensesList.innerHTML = sortedItems
    .map(
      (item) => `
        <tr>
          <td>${item.description || 'Sem descrição'}</td>
          <td>${formatCurrency(item.amount)}</td>
          <td>${String(item.due_day || Number(item.date?.slice(8, 10)) || '-').padStart(2, '0')}</td>
          <td>${item.is_fixed === true ? '-' : normalizeInstallmentsForMonth(item, monthContext)}</td>
          <td>${item.installments ? '-' : (item.is_fixed === true ? 'Sim' : item.is_fixed === false ? 'Não' : '-')}</td>
          <td>${formatPersonalCategory(item.category)}</td>
          <td class="personal-status ${item.status === 'pago' ? 'paid' : 'pending'}">${item.status === 'pago' ? 'Pago' : 'Pendente'}</td>
          <td>
            <button type="button" class="personal-toggle-status" data-id="${item.id ?? ''}" title="${item.status === 'pago' ? 'Marcar como pendente' : 'Marcar como pago'}" aria-label="${item.status === 'pago' ? 'Marcar como pendente' : 'Marcar como pago'}">${item.status === 'pago' ? 'Marcar pendente' : 'Marcar pago'}</button>
            <button type="button" class="personal-edit" data-id="${item.id ?? ''}" title="Editar" aria-label="Editar">✏️</button>
            <button type="button" class="personal-delete" data-id="${item.id ?? ''}" title="Excluir" aria-label="Excluir">🗑️</button>
          </td>
        </tr>
      `
    )
    .join('');

  if (personalExpensesFooter) {
    const displayedTotal = sortedItems.reduce((sum, item) => sum + Number(item.amount), 0);
    personalExpensesFooter.innerHTML = `
      <tr>
        <td colspan="7">Total visível</td>
        <td>${formatCurrency(displayedTotal)}</td>
      </tr>
    `;
  }

  personalExpensesList.querySelectorAll('.personal-delete').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      const currentItems = getPersonalExpenses();
      const nextItems = currentItems.filter((item) => String(item.id || '') !== id);
      try {
        await savePersonalExpenses(nextItems);
        renderPersonalExpenses();
      } catch (error) {
        showAppToast(error.message || 'Nao foi possivel excluir a despesa.', 'error');
      }
    });
  });

  personalExpensesList.querySelectorAll('.personal-toggle-status').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      const currentItems = getPersonalExpenses();
      const nextItems = currentItems.map((item) => {
        if (String(item.id || '') !== id) return item;
        return {
          ...item,
          status: item.status === 'pago' ? 'pendente' : 'pago'
        };
      });
      try {
        await savePersonalExpenses(nextItems);
        renderPersonalExpenses();
      } catch (error) {
        showAppToast(error.message || 'Nao foi possivel atualizar a situacao.', 'error');
      }
    });
  });

  personalExpensesList.querySelectorAll('.personal-edit').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const currentItems = getPersonalExpenses();
      const item = currentItems.find((entry) => String(entry.id) === id);
      if (!item) return;
      personalEditingId = item.id;
      if (personalEntryDescriptionInput) personalEntryDescriptionInput.value = item.description || '';
      if (personalEntryAmountInput) personalEntryAmountInput.value = item.amount || '';
      if (personalEntryDueDayInput) personalEntryDueDayInput.value = item.due_day || '';
      if (personalEntryInstallmentsInput) personalEntryInstallmentsInput.value = item.installments || '';
      if (personalEntryFixedSelect) {
        if (item.installments) personalEntryFixedSelect.value = '';
        else personalEntryFixedSelect.value = item.is_fixed === true ? 'sim' : 'nao';
      }
      if (personalEntryCategorySelect) personalEntryCategorySelect.value = normalizePersonalCategory(item.category || 'Outros');
      if (personalEntryStatusSelect) personalEntryStatusSelect.value = item.status || 'pendente';
      if (addPersonalExpenseButton) addPersonalExpenseButton.textContent = 'Salvar';
      if (personalTableAddButton) personalTableAddButton.textContent = 'Salvar';
      setActivePersonalTab('list');
    });
  });

  const categories = {};
  const days = {};

  sortedItems.forEach((item) => {
    if (item.type === 'saida') {
      const normalizedCategory = normalizePersonalCategory(item.category);
      categories[normalizedCategory] = (categories[normalizedCategory] || 0) + Number(item.amount);
      const day = item.date.slice(8, 10);
      days[day] = (days[day] || 0) + Number(item.amount);
    }
  });
  const sortedDays = Object.keys(days).sort((a, b) => Number(a) - Number(b));

  const personalPieCtx = document.getElementById('personal-pie');
  if (personalPieCtx) {
    const sortedCategoryEntries = Object.entries(categories).sort(([, amountA], [, amountB]) => amountB - amountA);
    const pieLabels = sortedCategoryEntries.map(([category]) => formatPersonalCategory(category));
    const pieValues = sortedCategoryEntries.map(([, amount]) => amount);
    const pieColors = [
      '#22c55e', '#fb7185', '#f59e0b', '#6366f1', '#38bdf8', '#ef4444',
      '#14b8a6', '#f97316', '#84cc16', '#eab308', '#10b981', '#3b82f6'
    ];
    if (window.personalPieChart) window.personalPieChart.destroy();
    window.personalPieChart = new Chart(personalPieCtx, {
      type: 'doughnut',
      data: {
        labels: pieLabels,
        datasets: [{
          data: pieValues,
          backgroundColor: pieLabels.map((_, index) => pieColors[index % pieColors.length]),
          hoverOffset: 8,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '55%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 16,
              generateLabels: (chart) => {
                const labels = chart.data.labels || [];
                const dataset = chart.data.datasets?.[0];
                const data = dataset?.data || [];
                const colors = dataset?.backgroundColor || [];

                return labels.map((label, index) => ({
                  text: `${label} - ${formatCurrency(Number(data[index]) || 0)}`,
                  fillStyle: colors[index],
                  strokeStyle: colors[index],
                  lineWidth: 0,
                  hidden: !chart.getDataVisibility(index),
                  index
                }));
              }
            }
          }
        }
      },
      plugins: [personalDonutPercentagePlugin]
    });
  }

  const personalBarCtx = document.getElementById('personal-bar');
  if (personalBarCtx) {
    if (window.personalBarChart) window.personalBarChart.destroy();
    window.personalBarChart = new Chart(personalBarCtx, {
      type: 'bar',
      data: {
        labels: sortedDays,
        datasets: [{
          label: 'Gastos por dia',
          data: sortedDays.map((day) => days[day]),
          backgroundColor: '#2563eb'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  renderDashboardDueReminders();
};

const addPersonalExpense = async (options = {}) => {
  const source = options.source || 'form';
  const expenseInput = getPersonalExpenseInput({ source });
  const description = expenseInput.description;
  const amount = Number(expenseInput.amount) || 0;
  const type = expenseInput.type;
  const category = expenseInput.category;
  const account = expenseInput.account;
  const status = expenseInput.status;
  const date = expenseInput.date;
  const due_day = expenseInput.due_day;
  const installments = expenseInput.installments;
  const is_fixed = expenseInput.is_fixed;
  if (amount <= 0) {
    showAppToast('Informe um valor valido para a despesa pessoal.', 'error');
    return;
  }

  rememberPersonalCategorySuggestion(category);

  const items = getPersonalExpenses();
  const updatedItem = {
    id: personalEditingId || Date.now(),
    description,
    amount,
    type,
    category,
    account,
    status,
    date,
    due_day,
    installments,
    is_fixed,
    installments_start_month: date.slice(0, 7)
  };

  if (personalEditingId) {
    const nextItems = items.map((item) => (String(item.id) === String(personalEditingId) ? updatedItem : item));
    try {
      await savePersonalExpenses(nextItems);
    } catch (error) {
      showAppToast(error.message || 'Nao foi possivel salvar a despesa.', 'error');
      return;
    }
    personalEditingId = null;
    if (addPersonalExpenseButton) addPersonalExpenseButton.textContent = 'Adicionar';
    if (personalTableAddButton) personalTableAddButton.textContent = 'Adicionar';
  } else {
    items.unshift(updatedItem);
    try {
      await savePersonalExpenses(items);
    } catch (error) {
      showAppToast(error.message || 'Nao foi possivel salvar a despesa.', 'error');
      return;
    }
  }

  renderPersonalExpenses();
  const resetPersonalInputs = [
    personalDescriptionInput,
    personalAmountInput,
    personalDueDayInput,
    personalInstallmentsInput,
    personalTypeSelect,
    personalCategorySelect,
    personalAccountSelect,
    personalStatusSelect,
    personalDateInput,
    personalEntryDescriptionInput,
    personalEntryAmountInput,
    personalEntryCategorySelect,
    personalEntryDueDayInput,
    personalEntryInstallmentsInput,
    personalEntryFixedSelect,
    personalEntryStatusSelect,
  ];
  resetPersonalInputs.forEach((input) => { if (input) input.value = ''; });
  if (personalTypeSelect) personalTypeSelect.value = 'saida';
  if (personalCategorySelect) personalCategorySelect.value = 'Alimentação';
  if (personalAccountSelect) personalAccountSelect.value = 'cartao';
  if (personalStatusSelect) personalStatusSelect.value = 'pendente';
  if (personalEntryCategorySelect) personalEntryCategorySelect.value = 'Alimentação';
  if (personalEntryFixedSelect) personalEntryFixedSelect.value = '';
  if (personalEntryStatusSelect) personalEntryStatusSelect.value = 'pendente';
};

const setActivePage = (pageId) => {
  if (pageId === 'admin-users' && !currentSessionUser?.isAdmin) {
    pageId = 'dashboard';
  }
  const targetPage = document.getElementById(pageId);
  if (!targetPage) return;
  pages.forEach((page) => page.classList.toggle('active', page.id === pageId));
  navButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.page === pageId));
  try {
    localStorage.setItem(ACTIVE_PAGE_KEY, pageId);
  } catch (error) {
    // Ignora falha de persistencia da aba ativa.
  }
  if (pageId === 'admin-users') {
    loadAdminUsers();
  }
};

const getSavedActivePage = () => {
  try {
    const savedPage = localStorage.getItem(ACTIVE_PAGE_KEY);
    if (!savedPage) return 'dashboard';
    const exists = Array.from(pages).some((page) => page.id === savedPage);
    return exists ? savedPage : 'dashboard';
  } catch (error) {
    return 'dashboard';
  }
};

navButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    setActivePage(button.dataset.page);
  });
});

personalFilterMonth?.addEventListener('change', renderPersonalExpenses);

summaryGoalsListEl?.addEventListener('click', (event) => {
  const target = event.target;
  
  // Handle dayOff toggle button
  if (target.classList.contains('summary-dayoff-toggle')) {
    const row = target.closest('.summary-goals-row');
    if (!row) return;
    
    const day = Number(target.dataset.day || 0);
    if (!day) return;
    
    const selectedMonth = getSelectedMonth();
    const goalInput = row.querySelector('.summary-goal-input');
    const doneInput = row.querySelector('.summary-done-input');
    
    const isDayOff = target.classList.contains('active');
    
    // Toggle the state
    target.classList.toggle('active');
    target.classList.toggle('inactive');
    target.textContent = isDayOff ? 'Trabalhar' : 'Folga';
    
    // Disable/enable inputs based on new dayOff status
    const newIsDayOff = target.classList.contains('active');
    if (goalInput) goalInput.disabled = newIsDayOff;
    if (doneInput) doneInput.disabled = newIsDayOff;
    
    // Save the state
    setSummaryDayValues(selectedMonth, day, { 
      goal: parseCurrencyInput(goalInput?.value || 0) || null, 
      done: parseCurrencyInput(doneInput?.value || 0) || null,
      dayOff: newIsDayOff ? true : false
    });
    
    updateSummaryGoalsTotalsFromInputs();
    return;
  }
});

summaryGoalsListEl?.addEventListener('change', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (!target.classList.contains('summary-goal-input')) return;

  const row = target.closest('.summary-goals-row');
  if (!row) return;

  const day = Number(target.dataset.day || row.querySelector('.summary-goal-input')?.dataset.day || 0);
  if (!day) return;

  const selectedMonth = getSelectedMonth();
  const goalInput = row.querySelector('.summary-goal-input');
  const doneInput = row.querySelector('.summary-done-input');
  const dayOffToggle = row.querySelector('.summary-dayoff-toggle');

  const goalRaw = String(goalInput?.value || '').trim();
  const doneRaw = String(doneInput?.value || '').trim();
  const goalValue = goalRaw ? parseCurrencyInput(goalRaw) : null;
  const doneValue = doneRaw ? parseCurrencyInput(doneRaw) : null;

  if (goalInput) goalInput.value = goalValue === null ? '' : formatDecimalPtBr(goalValue);
  if (doneInput) doneInput.value = doneValue === null ? '' : formatDecimalPtBr(doneValue);

  const isDayOff = dayOffToggle?.classList.contains('active') || false;
  setSummaryDayValues(selectedMonth, day, { goal: goalValue, done: doneValue, dayOff: isDayOff });
  updateSummaryGoalsTotalsFromInputs();
});


const loadRecords = async () => {
  const response = await apiFetch('/api/records');
  const records = await response.json();
  recordsTable.innerHTML = '';
  let monthlyIncome = 0;
  let monthlyExpense = 0;
  let monthlyProfit = 0;
  let monthlyUber = 0;
  let monthly99 = 0;
  let monthlyKm = 0;
  let monthlyHours = 0;
  let fuel = 0;
  let food = 0;
  let oil = 0;
  let wash = 0;
  let other = 0;
  const incomeByDay = {};
  const workedDays = new Set();
  const workedWeeks = new Set();
  const weeklyData = {};
  const selectedMonth = getSelectedMonth();
  const selectedHistoryMonth = historyMonthSelect?.value || selectedMonth;
  const weekTabSuffix = formatMonthYearSlash(selectedMonth);
  if (performanceWeekTabButton) {
    performanceWeekTabButton.textContent = weekTabSuffix
      ? `Médias por semana - ${weekTabSuffix}`
      : 'Médias por semana';
  }

  records.forEach((record) => {
    const parsedIncome = Number(record.income_value);
    const parsedExpense = Number(record.expense_value);
    const recordProfit = parsedIncome - parsedExpense;

    const recordMonth = record.date.slice(0, 7);
    if (recordMonth === selectedMonth) {
      monthlyIncome += parsedIncome;
      monthlyExpense += parsedExpense;
      monthlyProfit += recordProfit;
      const day = Number(String(record.date).slice(8, 10));
      if (day > 0) {
        incomeByDay[day] = (incomeByDay[day] || 0) + parsedIncome;
      }
      if (record.income_source === 'Uber') monthlyUber += parsedIncome;
      if (record.income_source === '99') monthly99 += parsedIncome;
      monthlyKm += Number(record.km) || 0;
      monthlyHours += Number(record.hours_worked) || 0;
      if ((parsedIncome + parsedExpense + (Number(record.km) || 0) + (Number(record.hours_worked) || 0)) > 0) {
        workedDays.add(record.date);
        const weekIndex = getWeekIndexInMonth(record.date);
        workedWeeks.add(weekIndex);
        if (!weeklyData[weekIndex]) {
          weeklyData[weekIndex] = {
            income: 0,
            expense: 0,
            km: 0,
            hours: 0,
            days: new Set()
          };
        }
        weeklyData[weekIndex].income += parsedIncome;
        weeklyData[weekIndex].expense += parsedExpense;
        weeklyData[weekIndex].km += Number(record.km) || 0;
        weeklyData[weekIndex].hours += Number(record.hours_worked) || 0;
        weeklyData[weekIndex].days.add(record.date);
      }
      if (record.expense_type === 'Combustível') fuel += parsedExpense;
      if (record.expense_type === 'Alimentação') food += parsedExpense;
      if (record.expense_type === 'Troca de óleo' || record.expense_type === 'Manutenção') oil += parsedExpense;
      if (record.expense_type === 'Lavagem') wash += parsedExpense;
      if (record.expense_type === 'Outros') other += parsedExpense;
    }

  });

  // Group records by date and build one row per date
  const byDate = {};
  records
    .filter((record) => record.date.slice(0, 7) === selectedHistoryMonth)
    .forEach((record) => {
    const d = record.date;
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(record);
  });

  const sortedDates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));

  sortedDates.forEach((date) => {
    const group = byDate[date];
    const groupIncome = group.reduce((sum, r) => sum + Number(r.income_value), 0);
    const groupExpense = group.reduce((sum, r) => sum + Number(r.expense_value), 0);
    const groupProfit = groupIncome - groupExpense;
    const groupKm = group.reduce((sum, r) => sum + (Number(r.km) || 0), 0);
    const groupHours = group.reduce((sum, r) => sum + (Number(r.hours_worked) || 0), 0);

    const expenseByType = {};
    group.forEach((r) => {
      const expense = Number(r.expense_value) || 0;
      const type = (r.expense_type || '').trim();
      if (!type || expense <= 0) return;
      expenseByType[type] = (expenseByType[type] || 0) + expense;
    });

    const expenseDetails = Object.entries(expenseByType)
      .map(([type, value]) => `${type}: ${formatCurrency(value)}`)
      .join('<br>') || '-';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expenseDetails}</td>
      <td>${formatCurrency(groupIncome)}</td>
      <td class="${groupProfit < 0 ? 'profit-negative' : 'profit-positive'}">${formatCurrency(groupProfit)}</td>
      <td>${groupKm.toFixed(1)} km</td>
      <td>${groupHours.toFixed(1)}h</td>
      <td class="actions-cell">
        <button class="edit-record-btn" data-date="${date}">✏️</button>
        <button class="delete-btn" data-date="${date}">🗑️</button>
      </td>
    `;
    recordsTable.appendChild(row);
  });

  if (!sortedDates.length) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="6">Nenhum registro encontrado para este mês.</td>';
    recordsTable.appendChild(emptyRow);
  }

  setText(totalIncomeEl, formatCurrency(monthlyIncome));
  setText(totalExpenseEl, formatCurrency(monthlyExpense));
  setText(totalProfitEl, formatCurrency(monthlyProfit));
  setText(dashboardTotalEl, formatCurrency(monthlyIncome));
  setText(dashboardProfitEl, formatCurrency(monthlyProfit));
  setText(dashboardGastosEl, formatCurrency(monthlyExpense));
  setText(monthIncomeEl, formatCurrency(monthlyIncome));
  setText(monthProfitEl, formatCurrency(monthlyProfit));
  setText(monthUberEl, formatCurrency(monthlyUber));
  setText(month99El, formatCurrency(monthly99));
  setText(expenseFuelEl, formatCurrency(fuel));
  setText(expenseFoodEl, formatCurrency(food));
  setText(expenseOilEl, formatCurrency(oil));
  setText(expenseWashEl, formatCurrency(wash));
  setText(expenseOtherEl, formatCurrency(other));
  setText(sidebarKmEl, `${monthlyKm.toFixed(1)} km`);
  setText(sidebarHoursEl, `${monthlyHours.toFixed(1)}h`);
  setText(performanceKmEl, `${monthlyKm.toFixed(1)} km`);
  setText(performanceHoursEl, `${monthlyHours.toFixed(1)}h`);
  setText(performanceIncomeEl, formatCurrency(monthlyIncome));
  setText(performanceProfitEl, formatCurrency(monthlyProfit));
  setText(performanceUberEl, formatCurrency(monthlyUber));
  setText(performance99El, formatCurrency(monthly99));

  const totalWorkedDays = workedDays.size;
  const totalWorkedWeeks = workedWeeks.size;
  const dayIncomeAvg = totalWorkedDays > 0 ? monthlyIncome / totalWorkedDays : 0;
  const dayExpenseAvg = totalWorkedDays > 0 ? monthlyExpense / totalWorkedDays : 0;
  const dayProfitAvg = totalWorkedDays > 0 ? monthlyProfit / totalWorkedDays : 0;

  const sortedWeeks = Object.keys(weeklyData)
    .map(Number)
    .sort((a, b) => a - b);

  if (performanceWeekSelect) {
    const previousValue = Number(performanceWeekSelect.value);
    const options = sortedWeeks
      .map((weekIndex) => {
        const rangeLabel = getWeekRangeLabel(selectedMonth, weekIndex);
        return `<option value="${weekIndex}">Semana ${String(weekIndex).padStart(2, '0')} (${rangeLabel})</option>`;
      })
      .join('');
    performanceWeekSelect.innerHTML = options;

    if (sortedWeeks.length) {
      let defaultWeek = sortedWeeks[0];
      if (sortedWeeks.includes(previousValue)) {
        defaultWeek = previousValue;
      } else {
        const now = new Date();
        const currentMonth = getCurrentYearMonth();
        if (selectedMonth === currentMonth) {
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          if (`${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}` === selectedMonth) {
            const yyyy = yesterday.getFullYear();
            const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
            const dd = String(yesterday.getDate()).padStart(2, '0');
            const weekOfYesterday = getWeekIndexInMonth(`${yyyy}-${mm}-${dd}`);
            if (sortedWeeks.includes(weekOfYesterday)) defaultWeek = weekOfYesterday;
          }
        }
      }
      performanceWeekSelect.value = String(defaultWeek);
    }
  }

  const selectedWeek = Number(performanceWeekSelect?.value || 0);
  const selectedWeekData = selectedWeek && weeklyData[selectedWeek]
    ? weeklyData[selectedWeek]
    : null;

  const weekIncomeAvg = selectedWeekData ? selectedWeekData.income : 0;
  const weekExpenseAvg = selectedWeekData ? selectedWeekData.expense : 0;
  const weekProfitAvg = selectedWeekData ? (selectedWeekData.income - selectedWeekData.expense) : 0;
  const selectedWeekWorkedDays = selectedWeekData ? selectedWeekData.days.size : 0;
  const kmIncomeAvg = monthlyKm > 0 ? monthlyIncome / monthlyKm : 0;
  const kmExpenseAvg = monthlyKm > 0 ? monthlyExpense / monthlyKm : 0;
  const kmProfitAvg = monthlyKm > 0 ? monthlyProfit / monthlyKm : 0;
  const hourIncomeAvg = monthlyHours > 0 ? monthlyIncome / monthlyHours : 0;
  const hourExpenseAvg = monthlyHours > 0 ? monthlyExpense / monthlyHours : 0;
  const hourProfitAvg = monthlyHours > 0 ? monthlyProfit / monthlyHours : 0;

  setText(performanceDayIncomeEl, formatCurrency(dayIncomeAvg));
  setText(performanceDayExpenseEl, formatCurrency(dayExpenseAvg));
  setText(performanceDayProfitEl, formatCurrency(dayProfitAvg));
  setText(performanceDaysWorkedEl, `${totalWorkedDays} dia(s)`);
  setText(performanceWeekIncomeEl, formatCurrency(weekIncomeAvg));
  setText(performanceWeekExpenseEl, formatCurrency(weekExpenseAvg));
  setText(performanceWeekProfitEl, formatCurrency(weekProfitAvg));
  setText(performanceWeeksWorkedEl, selectedWeekData
    ? `Semana ${String(selectedWeek).padStart(2, '0')} - ${selectedWeekWorkedDays} dia(s)`
    : `${totalWorkedWeeks} semana(s)`);
  setText(performanceKmIncomeEl, formatCurrency(kmIncomeAvg));
  setText(performanceKmExpenseEl, formatCurrency(kmExpenseAvg));
  setText(performanceKmProfitEl, formatCurrency(kmProfitAvg));
  setText(performanceKmTotalEl, `${monthlyKm.toFixed(1)} km`);
  setText(performanceHourIncomeEl, formatCurrency(hourIncomeAvg));
  setText(performanceHourExpenseEl, formatCurrency(hourExpenseAvg));
  setText(performanceHourProfitEl, formatCurrency(hourProfitAvg));
  setText(performanceHoursTotalEl, `${monthlyHours.toFixed(1)}h`);

  const goal = getMonthlyGoal();
  setText(monthlyGoalEl, formatCurrency(goal));
  setText(goalResultEl, formatCurrency(monthlyIncome));
  const rate = goal === 0 ? 0 : Math.min(100, Math.round((monthlyIncome / goal) * 100));
  const remaining = Math.max(0, goal - monthlyIncome);
  const remainingPercent = goal === 0 ? 0 : Math.max(0, Math.min(100, 100 - rate));
  setText(goalRateEl, `${rate}%`);
  setText(goalRemainingEl, formatCurrency(remaining));
  setText(goalResultPercentEl, `(${rate}%)`);
  setText(goalRemainingPercentEl, `(${remainingPercent}%)`);
  setText(goalRemainingRateEl, `${remainingPercent}%`);
  dashboardMonthlyIncome = monthlyIncome;
  renderPersonalExpenses();

  if (summaryGoalsListEl) {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const monthDailyData = getSummaryMonthDailyData(selectedMonth);
    const rows = [];

    for (let day = 1; day <= daysInMonth; day += 1) {
      const savedDay = monthDailyData[String(day)] || {};
      const dayGoalValue = Number.isFinite(Number(savedDay.goal)) ? Number(savedDay.goal) : null;
      const dayDoneValue = Number(incomeByDay[day] || 0);
      const isDayOff = Boolean(savedDay.dayOff || false);
      const weekdayName = getWeekdayName(selectedMonth, day);

      rows.push(`
        <div class="summary-goals-row">
          <div class="summary-goals-day">
            <strong>${String(day).padStart(2, '0')}</strong>
            <span>${weekdayName}</span>
          </div>
          <input class="summary-goal-input" data-day="${day}" type="text" inputmode="decimal" value="${dayGoalValue === null ? '' : formatDecimalPtBr(dayGoalValue)}" ${isDayOff ? 'disabled' : ''} />
          <input class="summary-done-input" data-day="${day}" type="text" inputmode="decimal" value="${formatDecimalPtBr(dayDoneValue)}" readonly ${isDayOff ? 'disabled' : ''} />
          <button class="summary-dayoff-toggle ${isDayOff ? 'active' : 'inactive'}" data-day="${day}" type="button">${isDayOff ? 'Folga' : 'Trabalhar'}</button>
        </div>
      `);
    }

    summaryGoalsListEl.innerHTML = rows.length
      ? rows.join('')
      : '<div class="summary-goals-empty">Sem dados para este mês.</div>';

    updateSummaryGoalsTotalsFromInputs();
  }

  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const date = btn.dataset.date;
      const confirmed = window.confirm(`Tem certeza que deseja apagar os registros do dia ${date}?`);
      if (!confirmed) return;
      try {
        await deleteRecordsByDate(date);
        showAppToast('Registro apagado com sucesso.');
        loadRecords();
      } catch (error) {
        showAppToast(error.message || 'Nao foi possivel apagar o registro.', 'error');
      }
    });
  });

  document.querySelectorAll('.edit-record-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const date = btn.dataset.date;
      const response = await apiFetch('/api/records');
      const allRecords = await response.json();
      const group = allRecords.filter((r) => r.date === date);
      if (!group.length) return;

      editingRecordId = date;

      if (recordDate) recordDate.value = date;

      const uberRec = group.find((r) => r.income_source === 'Uber');
      const rec99 = group.find((r) => r.income_source === '99');
      if (incomeUberValue) incomeUberValue.value = uberRec ? uberRec.income_value || '' : '';
      if (income99Value) income99Value.value = rec99 ? rec99.income_value || '' : '';

      const fuelRec = group.find((r) => r.expense_type === 'Combustível');
      const foodRec = group.find((r) => r.expense_type === 'Alimentação');
      const oilRec  = group.find((r) => r.expense_type === 'Troca de óleo' || r.expense_type === 'Manutenção');
      const washRec = group.find((r) => r.expense_type === 'Lavagem');
      const otherRec = group.find((r) => r.expense_type === 'Outros');
      if (expenseFuelValue) expenseFuelValue.value = fuelRec ? fuelRec.expense_value || '' : '';
      if (expenseFoodValue) expenseFoodValue.value = foodRec ? foodRec.expense_value || '' : '';
      if (expenseOilValue)  expenseOilValue.value  = oilRec  ? oilRec.expense_value  || '' : '';
      if (expenseWashValue) expenseWashValue.value = washRec ? washRec.expense_value || '' : '';
      if (expenseOtherValue) expenseOtherValue.value = otherRec ? otherRec.expense_value || '' : '';

      const kmRec = group.find((r) => Number(r.km) > 0);
      const hoursRec = group.find((r) => Number(r.hours_worked) > 0);
      if (kmInput) kmInput.value = kmRec ? kmRec.km || '' : '';
      if (hoursInput) hoursInput.value = hoursRec ? hoursRec.hours_worked || '' : '';

      const saveBtn = document.getElementById('save-record');
      if (saveBtn) saveBtn.textContent = 'Atualizar Registro';

      setActivePage('register');
    });
  });

  // Expense doughnut chart
  const expenseCtx = document.getElementById('expense-pie');
  if (expenseCtx && typeof Chart !== 'undefined') {
    if (window.expenseChart) window.expenseChart.destroy();
    window.expenseChart = new Chart(expenseCtx, {
      type: 'doughnut',
      data: {
        labels: ['Combustível', 'Alimentação', 'Troca de óleo', 'Lavagem', 'Outros'],
        datasets: [{
          data: [fuel, food, oil, wash, other],
          backgroundColor: ['#dc2626', '#f59e0b', '#0ea5e9', '#22c55e', '#2563eb'],
          hoverOffset: 8,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${formatCurrency(context.parsed)}`
            }
          }
        }
      }
    });
  }

  // Goal donut chart
  const goalCtx = document.getElementById('goal-donut');
  if (goalCtx && typeof Chart !== 'undefined') {
    if (window.goalChart) window.goalChart.destroy();
    window.goalChart = new Chart(goalCtx, {
      type: 'doughnut',
      data: {
        labels: ['Concluído', 'Restante'],
        datasets: [{
          data: [monthlyIncome, remaining],
          backgroundColor: ['#16a34a', '#e2e8f0'],
          hoverOffset: 8,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '80%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${formatCurrency(context.parsed)}`
            }
          }
        }
      }
    });
  }
};

const saveRecord = async () => {
  if (isSavingRecord) return;
  isSavingRecord = true;

  const date = recordDate.value;
  if (!date) {
    isSavingRecord = false;
    return alert('Selecione uma data.');
  }

  try {
    if (editingRecordId !== null) {
      // Delete all records for the edited date then recreate from form values
      await deleteRecordsByDate(editingRecordId, { allowEmpty: true });

      const uberInc = Number(incomeUberValue?.value || 0);
      const inc99   = Number(income99Value?.value  || 0);
      const fuelExp  = Number(expenseFuelValue?.value  || 0);
      const foodExp  = Number(expenseFoodValue?.value  || 0);
      const oilExp   = Number(expenseOilValue?.value   || 0);
      const washExp  = Number(expenseWashValue?.value  || 0);
      const otherExp = Number(expenseOtherValue?.value || 0);
      const kmVal    = Number(kmInput?.value    || 0);
      const hoursVal = Number(hoursInput?.value || 0);

      const incEntries = [
        { source: 'Uber', value: uberInc },
        { source: '99',   value: inc99 }
      ].filter((e) => e.value > 0);

      const expEntries = [
        { type: 'Combustível',   value: fuelExp  },
        { type: 'Alimentação',   value: foodExp  },
        { type: 'Troca de óleo', value: oilExp   },
        { type: 'Lavagem',       value: washExp  },
        { type: 'Outros',        value: otherExp }
      ].filter((e) => e.value > 0);

      const count = Math.max(incEntries.length, expEntries.length, 1);
      for (let i = 0; i < count; i += 1) {
        const inc = incEntries[i] || null;
        const exp = expEntries[i] || null;
        await apiFetch('/api/records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date,
            income_value:  inc?.value || 0,
            income_source: inc?.source || '',
            expense_value: exp?.value || 0,
            expense_type:  exp?.type  || '',
            km:            i === 0 ? kmVal    : 0,
            hours_worked:  i === 0 ? hoursVal : 0
          })
        });
      }

      editingRecordId = null;
      const saveBtn = document.getElementById('save-record');
      if (saveBtn) saveBtn.textContent = 'Salvar Registro';
      if (incomeUberValue) incomeUberValue.value = '';
      if (income99Value) income99Value.value = '';
      if (expenseFuelValue) expenseFuelValue.value = '';
      if (expenseFoodValue) expenseFoodValue.value = '';
      if (expenseOilValue) expenseOilValue.value = '';
      if (expenseWashValue) expenseWashValue.value = '';
      if (expenseOtherValue) expenseOtherValue.value = '';
      if (kmInput) kmInput.value = '';
      if (hoursInput) hoursInput.value = '';
      setActivePage('dashboard');
      loadRecords();
      showAppToast('Edicao atualizada com sucesso.');
      return;
    }

  const uberIncome = Number(incomeUberValue?.value || 0);
  const income99 = Number(income99Value?.value || 0);
  const expenseFuel = Number(expenseFuelValue?.value || 0);
  const expenseFood = Number(expenseFoodValue?.value || 0);
  const expenseOil = Number(expenseOilValue?.value || 0);
  const expenseWash = Number(expenseWashValue?.value || 0);
  const expenseOther = Number(expenseOtherValue?.value || 0);
  const expenseTotal = expenseFuel + expenseFood + expenseOil + expenseWash + expenseOther;
  const km = Number(kmInput.value || 0);
  const hours = Number(hoursInput.value || 0);

  if (uberIncome <= 0 && income99 <= 0 && expenseTotal <= 0 && km <= 0 && hours <= 0) {
    return alert('Informe ao menos uma receita ou despesa para salvar.');
  }

  const incomeEntries = [
    { source: 'Uber', value: uberIncome },
    { source: '99', value: income99 }
  ].filter((entry) => entry.value > 0);

  const expenseEntries = [
    { type: 'Combustível', value: expenseFuel },
    { type: 'Alimentação', value: expenseFood },
    { type: 'Troca de óleo', value: expenseOil },
    { type: 'Lavagem', value: expenseWash },
    { type: 'Outros', value: expenseOther }
  ].filter((entry) => entry.value > 0);

  const recordsCount = Math.max(incomeEntries.length, expenseEntries.length, 1);

  for (let index = 0; index < recordsCount; index += 1) {
    const incomeEntry = incomeEntries[index] || null;
    const expenseEntry = expenseEntries[index] || null;
    const carryOperationalValues = index === 0;

    await apiFetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        income_value: incomeEntry?.value || 0,
        income_source: incomeEntry?.source || '',
        expense_value: expenseEntry?.value || 0,
        expense_type: expenseEntry?.type || '',
        km: carryOperationalValues ? km : 0,
        hours_worked: carryOperationalValues ? hours : 0
      })
    });
  }

    recordDate.value = '';
    if (incomeUberValue) incomeUberValue.value = '';
    if (income99Value) income99Value.value = '';
    if (expenseFuelValue) expenseFuelValue.value = '';
    if (expenseFoodValue) expenseFoodValue.value = '';
    if (expenseOilValue) expenseOilValue.value = '';
    if (expenseWashValue) expenseWashValue.value = '';
    if (expenseOtherValue) expenseOtherValue.value = '';
    kmInput.value = '';
    hoursInput.value = '';
    setActivePage('dashboard');
    loadRecords();
  } catch (error) {
    alert(error.message || 'Nao foi possivel salvar a edicao.');
    showAppToast(error.message || 'Nao foi possivel salvar a edicao.', 'error');
  } finally {
    isSavingRecord = false;
  }
};

saveRecordButton.addEventListener('click', saveRecord);
addPersonalExpenseButton?.addEventListener('click', addPersonalExpense);
personalTableAddButton?.addEventListener('click', () => addPersonalExpense({ source: 'table' }));
personalEntryInstallmentsInput?.addEventListener('input', () => {
  if (!personalEntryInstallmentsInput?.value.trim()) return;
  if (personalEntryFixedSelect) personalEntryFixedSelect.value = '';
});
personalEntryFixedSelect?.addEventListener('change', () => {
  if (!personalEntryFixedSelect?.value) return;
  if (personalEntryInstallmentsInput) personalEntryInstallmentsInput.value = '';
});
saveGoalButton.addEventListener('click', (event) => {
  event.preventDefault();
  const goalValue = Number(monthlyGoalInput.value);
  const finalGoal = goalValue > 0 ? goalValue : 10000;
  setMonthlyGoal(finalGoal);
  if (monthlyGoalEl) {
    monthlyGoalEl.textContent = formatCurrency(finalGoal);
  }
  showGoalMessage('Meta mensal salva!');
  loadRecords();
});

const bindAuthUi = () => {
  authTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const isRegister = tab.dataset.authTab === 'register';
      if (isRegister && !publicRegisterEnabled) {
        setAuthMessage('Cadastro fechado. Peça para o administrador criar seu acesso.');
        setAuthMode('login');
        return;
      }
      setAuthMode(isRegister ? 'register' : 'login');
    });
  });

  openForgotFormButton?.addEventListener('click', () => {
    setAuthView('forgot');
    setAuthMessage('');
  });

  backToLoginButton?.addEventListener('click', () => {
    setAuthMode('login');
  });

  openResetManualButton?.addEventListener('click', () => {
    setAuthView('reset');
    setAuthMessage('');
  });

  authLoginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('auth-login-email')?.value?.trim() || '';
    const password = document.getElementById('auth-login-password')?.value || '';

    if (!email || !password) {
      setAuthMessage('Informe email e senha.');
      return;
    }

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setAuthMessage(payload?.error || 'Falha ao entrar.');
      return;
    }

    applySessionUser(payload.user);
    setAuthMessage('Acesso liberado!', 'success');
    openAppShell();
    setAuthView('login');
    if (!hasBootstrappedApp) {
      await loadPersonalExpenses();
      await importLegacyPersonalExpensesIfNeeded();
      init();
    } else {
      await loadPersonalExpenses();
      await importLegacyPersonalExpensesIfNeeded();
      loadRecords();
      renderPersonalExpenses();
    }
    await loadAdminUsers();
  });

  authRegisterForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('auth-register-name')?.value?.trim() || '';
    const email = document.getElementById('auth-register-email')?.value?.trim() || '';
    const password = document.getElementById('auth-register-password')?.value || '';

    if (!name || !email || password.length < 6) {
      setAuthMessage('Preencha nome, email e senha com no minimo 6 caracteres.');
      return;
    }

    if (!publicRegisterEnabled) {
      setAuthMessage('Cadastro fechado. Solicite acesso ao administrador.');
      return;
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setAuthMessage(payload?.error || 'Falha ao criar conta.');
      return;
    }

    applySessionUser(payload.user);
    setAuthMessage('Conta criada com sucesso!', 'success');
    openAppShell();
    setAuthView('login');
    if (!hasBootstrappedApp) {
      await loadPersonalExpenses();
      await importLegacyPersonalExpensesIfNeeded();
      init();
    } else {
      await loadPersonalExpenses();
      await importLegacyPersonalExpensesIfNeeded();
      loadRecords();
      renderPersonalExpenses();
    }
    await refreshRegisterAvailability();
    await loadAdminUsers();
  });

  authForgotForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('auth-forgot-email')?.value?.trim() || '';
    if (!email) {
      setAuthMessage('Informe o email da conta.');
      return;
    }

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setAuthMessage(payload?.error || 'Falha ao solicitar recuperacao.');
      return;
    }

    setAuthMessage(payload?.message || 'Se o email existir, enviaremos instrucoes de recuperacao.', 'success');
    setAuthView('reset');
    const resetEmailInput = document.getElementById('auth-reset-email');
    if (resetEmailInput) resetEmailInput.value = email;
  });

  authResetForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('auth-reset-email')?.value?.trim() || '';
    const token = document.getElementById('auth-reset-token')?.value?.trim() || '';
    const password = document.getElementById('auth-reset-password')?.value || '';
    const passwordConfirm = document.getElementById('auth-reset-password-confirm')?.value || '';

    if (!email || !token || password.length < 6) {
      setAuthMessage('Preencha email, token e nova senha com no minimo 6 caracteres.');
      return;
    }
    if (password !== passwordConfirm) {
      setAuthMessage('A confirmacao da nova senha nao confere.');
      return;
    }

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, newPassword: password })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setAuthMessage(payload?.error || 'Falha ao redefinir senha.');
      return;
    }

    setAuthMessage('Senha redefinida com sucesso. Entre com a nova senha.', 'success');
    setAuthMode('login');
  });

  logoutButton?.addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    personalExpensesCache = [];
    applySessionUser(null);
    openAuthGate();
    setAuthMode('login');
    setAuthMessage('Voce saiu da conta.');
  });

  adminCreateUserForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = adminCreateNameInput?.value?.trim() || '';
    const email = adminCreateEmailInput?.value?.trim() || '';
    const password = adminCreatePasswordInput?.value || '';
    const isAdmin = Boolean(adminCreateIsAdminInput?.checked);

    if (!name || !email || password.length < 6) {
      setAdminUsersMessage('Preencha nome, email e senha inicial com no minimo 6 caracteres.');
      return;
    }

    const response = await apiFetch('/api/auth/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, isAdmin })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setAdminUsersMessage(payload?.error || 'Falha ao criar usuario.');
      return;
    }

    setAdminUsersMessage('Usuario criado com sucesso.', 'success');
    adminCreateUserForm.reset();
    await loadAdminUsers();
  });

  openPasswordModalButton?.addEventListener('click', openPasswordModal);
  closePasswordModalButton?.addEventListener('click', closePasswordModal);
  passwordModalEl?.addEventListener('click', (event) => {
    if (event.target === passwordModalEl) closePasswordModal();
  });

  passwordForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const currentPassword = currentPasswordInput?.value || '';
    const newPassword = newPasswordInput?.value || '';
    const confirmPassword = confirmPasswordInput?.value || '';

    if (!currentPassword || newPassword.length < 6) {
      setPasswordMessage('Informe a senha atual e uma nova senha com no minimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('A confirmacao da nova senha nao confere.');
      return;
    }

    const response = await apiFetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setPasswordMessage(payload?.error || 'Falha ao alterar senha.');
      return;
    }

    setPasswordMessage('Senha alterada com sucesso.', 'success');
    showAppToast('Senha alterada com sucesso.');
    window.setTimeout(() => {
      closePasswordModal();
    }, 900);
  });
};

const bootstrapAuth = async () => {
  bindAuthUi();
  await refreshRegisterAvailability();
  setAuthMode('login');

  const params = new URLSearchParams(window.location.search);
  const resetToken = params.get('resetToken');
  const resetEmail = params.get('email');
  if (resetToken) {
    setAuthView('reset');
    const resetTokenInput = document.getElementById('auth-reset-token');
    const resetEmailInput = document.getElementById('auth-reset-email');
    if (resetTokenInput) resetTokenInput.value = resetToken;
    if (resetEmailInput && resetEmail) resetEmailInput.value = resetEmail;
    setAuthMessage('Informe a nova senha para concluir a recuperacao.', 'success');
  }

  const response = await fetch('/api/auth/me');
  if (!response.ok) {
    openAuthGate();
    return;
  }

  const payload = await response.json().catch(() => ({}));
  applySessionUser(payload.user);
  openAppShell();
  await loadPersonalExpenses();
  await importLegacyPersonalExpensesIfNeeded();
  await loadAdminUsers();
  init();
};

const init = () => {
  if (hasBootstrappedApp) return;
  hasBootstrappedApp = true;
  recordDate.value = new Date().toISOString().substring(0, 10);
  populateMonthSelect();
  populatePersonalMonthFilter();
  renderPersonalCategorySuggestions();
  const savedGoal = getMonthlyGoal();
  setMonthlyGoal(savedGoal);

  if (!localStorage.getItem(SUMMARY_DAILY_GOALS_RESET_FLAG_KEY)) {
    localStorage.removeItem(SUMMARY_DAILY_GOALS_KEY);
    localStorage.setItem(SUMMARY_DAILY_GOALS_RESET_FLAG_KEY, '1');
  }

  if (monthlyGoalEl) {
    monthlyGoalEl.textContent = formatCurrency(savedGoal);
  }

  const handleMonthChange = (event) => {
    const selectedValue = event?.target?.value;
    syncMonthSelectors(selectedValue);
    loadRecords();
  };

  monthSelect?.addEventListener('change', handleMonthChange);
  historyMonthSelect?.addEventListener('change', handleMonthChange);
  summaryMonthSelect?.addEventListener('change', handleMonthChange);

  performanceWeekSelect?.addEventListener('change', loadRecords);
  personalTabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActivePersonalTab(button.dataset.personalTab);
    });
  });
  performanceTabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActivePerformanceTab(button.dataset.performanceTab);
    });
  });
  setActivePage(getSavedActivePage());
  setActivePersonalTab(getSavedPersonalTab());
  setActivePerformanceTab(getSavedPerformanceTab());
  renderPersonalExpenses();
  renderDashboardDueReminders();
  loadRecords();
};

bootstrapAuth();
