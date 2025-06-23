import org.example.entities.FormaPagamento;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.math.BigDecimal;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.*;

class FormaPagamentoTest {

    private FormaPagamento formaPagamento;
    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        formaPagamento = new FormaPagamento(1L, "Cartão de Crédito", "S", true, 12, new BigDecimal("1.50"));
    }

    @Test
    void testConstrutorEGetters() {
        assertEquals(1L, formaPagamento.getFpgId());
        assertEquals("Cartão de Crédito", formaPagamento.getFpgDescricao());
        assertEquals("S", formaPagamento.getFpgAtivo());
        assertTrue(formaPagamento.getFpgPermiteParcelamento());
        assertEquals(12, formaPagamento.getFpgNumeroMaximoParcelas());
        assertEquals(new BigDecimal("1.50"), formaPagamento.getFpgTaxaAdicional());
    }

    @Test
    void testSettersValidos() {
        formaPagamento.setFpgDescricao("Dinheiro");
        formaPagamento.setFpgAtivo("N");
        formaPagamento.setFpgPermiteParcelamento(false);
        formaPagamento.setFpgNumeroMaximoParcelas(6);
        formaPagamento.setFpgTaxaAdicional(new BigDecimal("0.75"));

        assertEquals("Dinheiro", formaPagamento.getFpgDescricao());
        assertEquals("N", formaPagamento.getFpgAtivo());
        assertFalse(formaPagamento.getFpgPermiteParcelamento());
        assertEquals(6, formaPagamento.getFpgNumeroMaximoParcelas());
        assertEquals(new BigDecimal("0.75"), formaPagamento.getFpgTaxaAdicional());
    }

    @Test
    void testDescricaoNula() {
        formaPagamento.setFpgDescricao(null);
        Set<ConstraintViolation<FormaPagamento>> violations = validator.validate(formaPagamento);
        assertFalse(violations.isEmpty());
        assertEquals("Descrição é obrigatório", violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("fpgDescricao"))
                .findFirst().get().getMessage());
    }

    @Test
    void testFpgAtivoNulo() {
        formaPagamento.setFpgAtivo(null);
        Set<ConstraintViolation<FormaPagamento>> violations = validator.validate(formaPagamento);
        assertFalse(violations.isEmpty());
        assertEquals("Status é obrigatório", violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("fpgAtivo"))
                .findFirst().get().getMessage());
    }

    @Test
    void testFpgAtivoInvalido() {
        formaPagamento.setFpgAtivo("X");
        Set<ConstraintViolation<FormaPagamento>> violations = validator.validate(formaPagamento);
        assertFalse(violations.isEmpty());
        assertEquals("Status inválido (use S ou N)", violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("fpgAtivo"))
                .findFirst().get().getMessage());
    }

    @Test
    void testFpgPermiteParcelamentoNulo() {
        formaPagamento.setFpgPermiteParcelamento(null);
        Set<ConstraintViolation<FormaPagamento>> violations = validator.validate(formaPagamento);
        assertFalse(violations.isEmpty());
        assertEquals("Permite Parcelamento é obrigatório", violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("fpgPermiteParcelamento"))
                .findFirst().get().getMessage());
    }

    @Test
    void testFpgNumeroMaximoParcelasNulo() {
        formaPagamento.setFpgNumeroMaximoParcelas(null);
        Set<ConstraintViolation<FormaPagamento>> violations = validator.validate(formaPagamento);
        assertFalse(violations.isEmpty());
        assertEquals("Número máximo de parcelas é obrigatório", violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("fpgNumeroMaximoParcelas"))
                .findFirst().get().getMessage());
    }

    @Test
    void testFpgNumeroMaximoParcelasInvalido() {
        formaPagamento.setFpgNumeroMaximoParcelas(0);
        Set<ConstraintViolation<FormaPagamento>> violations = validator.validate(formaPagamento);
        assertFalse(violations.isEmpty());
        assertEquals("Número máximo de parcelas deve ser pelo menos 1", violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("fpgNumeroMaximoParcelas"))
                .findFirst().get().getMessage());
    }

    @Test
    void testFpgTaxaAdicionalNula() {
        formaPagamento.setFpgTaxaAdicional(null);
        Set<ConstraintViolation<FormaPagamento>> violations = validator.validate(formaPagamento);
        assertFalse(violations.isEmpty());
        assertEquals("Taxa adicional é obrigatória", violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("fpgTaxaAdicional"))
                .findFirst().get().getMessage());
    }

    @Test
    void testFpgTaxaAdicionalNegativa() {
        formaPagamento.setFpgTaxaAdicional(new BigDecimal("-1.00"));
        Set<ConstraintViolation<FormaPagamento>> violations = validator.validate(formaPagamento);
        assertFalse(violations.isEmpty());
        assertEquals("Taxa adicional não pode ser negativa", violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("fpgTaxaAdicional"))
                .findFirst().get().getMessage());
    }
}