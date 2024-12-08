<template>
	<v-card class="mx-auto text-start overflow-y-auto" max-height="90%" min-width="80%" max-width="800">
		<v-card-title>Alunos</v-card-title>

		<v-table>
			<thead>
				<tr>
					<th>Nome</th>
					<th>Email</th>
					<th>Curso</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="loading">
					<tr>
						<td colspan="4" class="text-center">
							<v-progress-circular indeterminate></v-progress-circular>
						</td>
					</tr>
				</template>
				<template v-else-if="students.length === 0">
					<tr>
						<td colspan="4" class="text-center pa-5">
							<v-icon icon="mdi-alert" size="large" color="warning" class="mb-2" />
							<div>Nenhum aluno encontrado</div>
						</td>
					</tr>
				</template>
				<template v-else>
					<tr v-for="student in paginatedStudents" :key="student.id">
						<td>{{ student.user.name }}</td>
						<td>{{ student.user.email }}</td>
						<td>{{ student.course }}</td>
						<td>
							<v-btn
								size="small"
								variant="text"
								icon="mdi-cash-plus"
								@click="openTransferDialog(student)"
							/>
						</td>
					</tr>
				</template>
			</tbody>
		</v-table>

		<v-pagination v-if="students.length" v-model="page" :length="pageCount" :total-visible="7" class="mt-4" />

		<!-- Transfer Dialog -->
		<v-dialog v-model="dialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span>Transferir Moedas</span>
				</v-card-title>

				<v-card-text>
					<v-container>
						<p>Aluno: {{ selectedStudent?.user?.name }}</p>
						<v-text-field
							v-model="coinsToTransfer"
							label="Quantidade de moedas"
							type="number"
							min="0"
							:rules="[validatePositive]"
						></v-text-field>
						<v-textarea
							v-model="description"
							label="Descrição"
							:rules="[
								(v) => !!v || 'Descrição é obrigatória',
								(v) => v.length >= 1 || 'A descrição deve ter pelo menos 1 caractere',
							]"
						></v-textarea>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="error" variant="text" @click="closeDialog">Cancelar</v-btn>
					<v-btn
						color="success"
						variant="text"
						@click="transferCoins"
						:loading="transferLoading"
						:disabled="!coinsToTransfer || coinsToTransfer <= 0"
					>
						Transferir
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFetchs } from '../composables/useFetchs';
import { useAuth } from '../composables/useAuth';
import { toast } from 'vue3-toastify';

const { user } = useAuth();
const { listStudents, sendCoins, findAccount } = useFetchs();

const students = ref([]);
const page = ref(1);
const itemsPerPage = 10;
const loading = ref(true);
const dialog = ref(false);
const transferLoading = ref(false);
const selectedStudent = ref(null);
const coinsToTransfer = ref(0);
const description = ref('');
const account = ref({});

const validatePositive = (v) => v > 0 || 'Quantidade deve ser maior que 0';

const pageCount = computed(() => Math.ceil(students.value.length / itemsPerPage));

const paginatedStudents = computed(() => {
	const start = (page.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return students.value.slice(start, end);
});

const openTransferDialog = (student) => {
	selectedStudent.value = student;
	coinsToTransfer.value = 0;
	dialog.value = true;
};

const closeDialog = () => {
	dialog.value = false;
	selectedStudent.value = null;
	coinsToTransfer.value = 0;
};

const transferCoins = async () => {
	try {
		transferLoading.value = true;
		await sendCoins(account.value.id, {
			coins: coinsToTransfer.value,
			professorId: user.professors?.id,
			studentId: selectedStudent.value.id,
			description: description.value,
		});
		toast.success('Moedas transferidas com sucesso!');
		closeDialog();
	} catch (error) {
		console.error(error);
		if (error.response?.data?.message === 'Not enough coins') {
			toast.error('Saldo insuficiente!');
		} else {
			toast.error('Erro ao transferir moedas!');
		}
	} finally {
		transferLoading.value = false;
	}
};

const fetchStudents = async () => {
	try {
		loading.value = true;
		students.value = await listStudents();
	} catch (error) {
		toast.error('Erro ao carregar alunos');
	} finally {
		loading.value = false;
	}
};

onMounted(async () => {
	account.value = await findAccount('professor', user.professors?.id);
	await fetchStudents();
});
</script>

<style scoped>
td {
	text-align: start;
}
</style>
